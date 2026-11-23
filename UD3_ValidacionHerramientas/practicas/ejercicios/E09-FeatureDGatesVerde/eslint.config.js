import js from '@eslint/js';
import globals from 'globals';

const capas = 'Las capas son controladores → servicios → repositorios (constitución).';

export default [
  { ignores: ['coverage/', 'playwright-report/', 'test-results/'] },
  js.configs.recommended,
  {
    languageOptions: { globals: globals.node },
  },
  {
    files: ['public/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['src/controladores/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/repositorios/**'],
              message: `Un controlador no accede a los repositorios. ${capas}`,
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/servicios/**/*.js', 'src/repositorios/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'express',
              message: `Los servicios y los repositorios no dependen de HTTP. ${capas}`,
            },
          ],
          patterns: [
            {
              group: ['**/controladores/**', '**/rutas/**'],
              message: `Una capa no llama a las de arriba. ${capas}`,
            },
          ],
        },
      ],
    },
  },
];
