// Prueba el servidor MCP del proyecto sin modelo: lista lo que ofrece y
// hace algunas llamadas. Uso: npm run probar-mcp
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const cliente = new Client({ name: 'probar-mcp', version: '1.0.0' });
await cliente.connect(
  new StdioClientTransport({ command: 'node', args: ['mcp/servidor-prestamo.js'] }),
);

const { tools } = await cliente.listTools();
console.log('Herramientas:');
for (const herramienta of tools) {
  console.log(`- ${herramienta.name}: ${herramienta.description}`);
}

const { resourceTemplates } = await cliente.listResourceTemplates();
console.log('Plantillas de recursos:');
for (const plantilla of resourceTemplates) {
  console.log(`- ${plantilla.uriTemplate}: ${plantilla.description}`);
}

async function leer(uri) {
  try {
    const { contents } = await cliente.readResource({ uri });
    console.log(`${uri} → ${contents[0].text.split('\n')[0]}`);
  } catch (error) {
    console.log(`${uri} → rechazado: ${error.message}`);
  }
}

await leer('incidencia://incidencia-07.md');
await leer('incidencia://..%2F..%2Fpackage.json');

await cliente.close();
