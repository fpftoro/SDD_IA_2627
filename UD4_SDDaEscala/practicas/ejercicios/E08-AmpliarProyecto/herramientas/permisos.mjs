// Muestra las reglas de un agente que afectan a la edición, la terminal, los
// encargos a otros agentes y la web, en el orden en que se aplican.
// Uso: opencode debug agents | node herramientas/permisos.mjs <agente>
import { readFileSync } from 'node:fs';

const nombre = process.argv[2];
const agentes = JSON.parse(readFileSync(0, 'utf8'));
const agente = agentes.find((a) => a.id === nombre);
if (!agente) {
  console.error(`No hay ningún agente «${nombre}». Agentes: ${agentes.map((a) => a.id).join(', ')}`);
  process.exit(1);
}
console.log(`${agente.id} (${agente.mode})`);
for (const regla of agente.permissions) {
  if (['*', 'edit', 'shell', 'subagent', 'webfetch', 'websearch'].includes(regla.action)) {
    console.log(`  ${regla.action.padEnd(9)} ${regla.resource.padEnd(28)} ${regla.effect}`);
  }
}
