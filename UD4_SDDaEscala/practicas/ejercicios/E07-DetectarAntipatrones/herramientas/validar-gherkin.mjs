// Comprueba la sintaxis de los escenarios de Gherkin del proyecto: los ficheros
// .feature y los bloques ```gherkin de los ficheros Markdown de docs/ y del README.md.
// Uso: npm run validar
import { AstBuilder, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin';
import { IdGenerator } from '@cucumber/messages';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Lista los ficheros .feature y .md de una carpeta y sus subcarpetas.
 * @param {string} carpeta Carpeta de la que se parte.
 * @returns {string[]} Rutas de los ficheros encontrados.
 */
function buscarFicheros(carpeta) {
  if (!existsSync(carpeta)) {
    return [];
  }
  return readdirSync(carpeta).flatMap((nombre) => {
    const ruta = join(carpeta, nombre);
    if (statSync(ruta).isDirectory()) {
      return buscarFicheros(ruta);
    }
    return ruta.endsWith('.feature') || ruta.endsWith('.md') ? [ruta] : [];
  });
}

/**
 * Extrae los documentos de Gherkin de un fichero.
 * @param {string} ruta Fichero .feature o .md.
 * @returns {string[]} El contenido del .feature o cada bloque ```gherkin del .md.
 */
function extraerDocumentos(ruta) {
  const texto = readFileSync(ruta, 'utf8');
  if (ruta.endsWith('.feature')) {
    return [texto];
  }
  return [...texto.matchAll(/```gherkin\n([\s\S]*?)```/g)].map((bloque) => bloque[1]);
}

let validos = 0;
let errores = 0;
const ficheros = [...buscarFicheros('docs').sort(), ...(existsSync('README.md') ? ['README.md'] : [])];
for (const ruta of ficheros) {
  for (const [i, documento] of extraerDocumentos(ruta).entries()) {
    const donde = ruta.endsWith('.feature') ? ruta : `${ruta}, bloque ${i + 1}`;
    if (!/^#\s*language:\s*es\b/m.test(documento)) {
      errores++;
      console.log(`❌ ${donde}: falta «# language: es» en la primera línea`);
      continue;
    }
    try {
      new Parser(new AstBuilder(IdGenerator.uuid()), new GherkinClassicTokenMatcher()).parse(documento);
      validos++;
    } catch (error) {
      errores++;
      const mensaje = String(error.message).split('\n').slice(1).join(' | ');
      console.log(`❌ ${donde}: ${mensaje}`);
    }
  }
}

if (validos + errores === 0) {
  console.log('⚠️  No hay ningún escenario de Gherkin en docs/ ni en el README.md');
  process.exit(1);
}
const plural = (n, palabra) => `${n} ${palabra}${n === 1 ? '' : 's'}`;
console.log(
  errores === 0
    ? `✅ ${plural(validos, 'documento')} de Gherkin sin errores`
    : `❌ ${plural(errores, 'documento')} con errores`,
);
process.exit(errores === 0 ? 0 : 1);
