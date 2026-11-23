import js from '@eslint/js';
import globals from 'globals';

const capas =
  'Las capas son rutas → controladores → servicios → repositorios (constitución).';

function prohibir(grupos, mensaje) {
  return {
    'no-restricted-imports': [
      'error',
      { patterns: [{ group: grupos, message: `${mensaje} ${capas}` }] },
    ],
  };
}

export default [
  { ignores: ['coverage/'] },
  js.configs.recommended,
  {
    languageOptions: { globals: globals.node },
  },
  {
    files: ['src/rutas/**/*.js'],
    rules: prohibir(
      ['**/servicios/**', '**/repositorios/**'],
      'Una ruta solo llama a controladores.',
    ),
  },
  {
    files: ['src/controladores/**/*.js'],
    rules: prohibir(
      ['**/repositorios/**', '**/rutas/**'],
      'Un controlador no accede a los repositorios.',
    ),
  },
  {
    files: ['src/servicios/**/*.js'],
    rules: prohibir(
      ['**/controladores/**', '**/rutas/**', 'express'],
      'Un servicio no conoce HTTP ni las capas de arriba.',
    ),
  },
  {
    files: ['src/repositorios/**/*.js'],
    rules: prohibir(
      ['**/servicios/**', '**/controladores/**', '**/rutas/**', 'express'],
      'Un repositorio no llama a ninguna otra capa.',
    ),
  },
];
