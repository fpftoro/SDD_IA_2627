import { readdirSync, readFileSync } from 'node:fs';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { repositorioPortatiles } from '../src/repositorios/repositorio-portatiles.js';

const servidor = new McpServer({ name: 'prestamo-portatiles', version: '1.0.0' });

servidor.registerTool(
  'listar_portatiles',
  {
    description:
      'Devuelve los portátiles del centro con su carro y su estado. Se puede filtrar por estado. Solo lee.',
    inputSchema: {
      estado: z.enum(['disponible', 'prestado', 'averiado']).optional(),
    },
  },
  async ({ estado }) => {
    const portatiles = repositorioPortatiles
      .obtenerTodos()
      .filter((portatil) => !estado || portatil.estado === estado);
    return {
      content: [{ type: 'text', text: JSON.stringify(portatiles, null, 2) }],
    };
  },
);

const CARPETA_INCIDENCIAS = 'docs/incidencias';

function incidencias() {
  return readdirSync(CARPETA_INCIDENCIAS).filter((nombre) =>
    nombre.endsWith('.md'),
  );
}

servidor.registerResource(
  'incidencia',
  new ResourceTemplate('incidencia://{fichero}', {
    list: () => ({
      resources: incidencias().map((fichero) => ({
        uri: `incidencia://${fichero}`,
        name: fichero,
        mimeType: 'text/markdown',
      })),
    }),
  }),
  { description: 'Una incidencia anotada por el profesorado. Solo lectura.' },
  async (uri, { fichero }) => {
    const nombre = decodeURIComponent(fichero);
    if (!incidencias().includes(nombre)) {
      throw new Error(`No hay ninguna incidencia ${nombre}`);
    }
    return {
      contents: [
        { uri: uri.href, text: readFileSync(`${CARPETA_INCIDENCIAS}/${nombre}`, 'utf8') },
      ],
    };
  },
);

await servidor.connect(new StdioServerTransport());
