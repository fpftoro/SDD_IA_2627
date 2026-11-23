import { defineConfig } from 'vitest/config';

// Solo se ejecutan los tests de tests/. Los de material/ son los que se
// copian a cada feature cuando toca.
export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
  },
});
