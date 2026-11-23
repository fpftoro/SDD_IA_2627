import { expect, test } from '@playwright/test';

test('Recorrido de la lista de tareas', async ({ page }) => {
  const campo = page.getByLabel('Texto de la tarea');
  const botonAnadir = page.getByRole('button', { name: 'Añadir' });
  const tareas = page.getByRole('listitem');
  const sinTareas = page.getByText('Todavía no hay tareas');

  await page.goto('/');

  await test.step('B-RF-03, B-AC-02: sin tareas, la página lo dice', async () => {
    await expect(sinTareas).toBeVisible();
    await expect(tareas).toHaveCount(0);
  });

  await test.step('B-AC-04: al añadir la primera tarea, desaparece el mensaje', async () => {
    await campo.fill('Comprar leche');
    await botonAnadir.click();

    await expect(tareas).toHaveText([/^Comprar leche \(pendiente\)/]);
    await expect(sinTareas).toBeHidden();
  });

  await campo.fill('Pagar la luz');
  await botonAnadir.click();
  await expect(tareas).toHaveCount(2);

  await test.step('A-RF-03, A-AC-01: la tarea nueva aparece al final sin recargar', async () => {
    await campo.fill('Llamar al fontanero');
    await botonAnadir.click();

    await expect(tareas).toHaveCount(3);
    await expect(tareas.last()).toHaveText(/^Llamar al fontanero \(pendiente\)/);
  });

  await test.step('A-AC-02: con el campo vacío no se añade nada', async () => {
    await campo.fill('');
    await botonAnadir.click();

    await expect(tareas).toHaveCount(3);
    await expect(campo).toHaveValue('');
  });

  await test.step('A-EC-06, A-AC-04: una tarea rechazada muestra el error y conserva el texto', async () => {
    await campo.fill('a'.repeat(281));
    await botonAnadir.click();

    await expect(page.getByRole('alert')).toHaveText(
      'El texto no puede superar 280 caracteres',
    );
    await expect(tareas).toHaveCount(3);
    await expect(campo).toHaveValue('a'.repeat(281));
  });

  await test.step('B-RF-02, B-AC-01: al abrir la página, las tareas salen en el orden en que se añadieron', async () => {
    await page.reload();

    await expect(tareas).toHaveText([
      /^Comprar leche \(pendiente\)/,
      /^Pagar la luz \(pendiente\)/,
      /^Llamar al fontanero \(pendiente\)/,
    ]);
    await expect(sinTareas).toBeHidden();
  });
});

test('B-EC-03: si el servidor responde con un error, la página lo muestra', async ({ page }) => {
  await page.route('**/tareas', (ruta) =>
    ruta.fulfill({ status: 500, json: { error: 'Error al obtener las tareas' } }),
  );

  await page.goto('/');

  await expect(page.getByRole('alert')).toHaveText('Error al obtener las tareas');
  await expect(page.getByText('Todavía no hay tareas')).toBeHidden();
});

test('B-EC-04: si el servidor no responde, la página lo dice', async ({ page }) => {
  await page.route('**/tareas', (ruta) => ruta.abort());

  await page.goto('/');

  await expect(page.getByRole('alert')).toHaveText(
    'No se ha podido conectar con el servidor',
  );
  await expect(page.getByText('Todavía no hay tareas')).toBeHidden();
});
