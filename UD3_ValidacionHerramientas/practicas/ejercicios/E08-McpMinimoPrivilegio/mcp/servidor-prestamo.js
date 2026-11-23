import { readFileSync } from 'node:fs';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { repositorioPortatiles } from '../src/repositorios/repositorio-portatiles.js';

const servidor = new McpServer({ name: 'prestamo-portatiles', version: '1.0.0' });

servidor.registerTool(
  'listar_portatiles',
  {
    description:
      'Devuelve los portátiles del centro con su carro y su estado. Se puede filtrar por estado.',
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

servidor.registerTool(
  'cambiar_estado',
  {
    description: 'Cambia el estado de un portátil.',
    inputSchema: {
      id: z.number(),
      estado: z.string(),
    },
  },
  async ({ id, estado }) => {
    const portatil = repositorioPortatiles.obtenerPorId(id);
    repositorioPortatiles.cambiarEstado(id, estado);
    return {
      content: [
        { type: 'text', text: `${portatil?.codigo ?? id}: ahora ${estado}` },
      ],
    };
  },
);

servidor.registerResource(
  'documento',
  new ResourceTemplate('doc://{ruta}', { list: undefined }),
  { description: 'Un documento de la carpeta docs del proyecto' },
  async (uri, { ruta }) => ({
    contents: [
      { uri: uri.href, text: readFileSync(`docs/${decodeURIComponent(ruta)}`, 'utf8') },
    ],
  }),
);

await servidor.connect(new StdioServerTransport());
