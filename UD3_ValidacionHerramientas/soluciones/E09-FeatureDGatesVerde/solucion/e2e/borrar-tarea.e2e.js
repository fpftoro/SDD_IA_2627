import { expect, test } from '@playwright/test';

test('Borrar tareas desde la página', async ({ page, request }) => {
  await request.post('/tareas', { data: { text: 'Comprar pan' } });
  await request.post('/tareas', { data: { text: 'Regar las plantas' } });
  await page.goto('/');

  const tareas = page.getByRole('listitem');
  const tarea = (texto) => tareas.filter({ hasText: texto });

  await test.step('D-RF-03: cada tarea tiene su botón Borrar', async () => {
    await expect(
      tarea('Comprar pan').getByRole('button', { name: 'Borrar' }),
    ).toBeVisible();
    await expect(
      tarea('Regar las plantas').getByRole('button', { name: 'Borrar' }),
    ).toBeVisible();
  });

  await test.step('D-RF-04, D-AC-02: la tarea borrada desaparece sin recargar', async () => {
    await tarea('Comprar pan').getByRole('button', { name: 'Borrar' }).click();

    await expect(tarea('Comprar pan')).toHaveCount(0);
    await expect(tarea('Regar las plantas')).toHaveCount(1);
  });

  await test.step('D-AC-03: al borrar la última, la página lo dice', async () => {
    while ((await tareas.count()) > 0) {
      const antes = await tareas.count();
      await tareas.first().getByRole('button', { name: 'Borrar' }).click();
      await expect(tareas).toHaveCount(antes - 1);
    }

    await expect(page.getByText('Todavía no hay tareas')).toBeVisible();
  });
});

test('D-EC-03: si el servidor no borra la tarea, la página muestra el error y la conserva', async ({ page, request }) => {
  const creada = await request.post('/tareas', {
    data: { text: 'Llamar al dentista' },
  });
  const { id } = await creada.json();
  await page.route('**/tareas/*', (ruta) =>
    ruta.request().method() === 'DELETE'
      ? ruta.fulfill({ status: 500, json: { error: 'Error al borrar la tarea' } })
      : ruta.continue(),
  );
  await page.goto('/');
  const tarea = page.getByRole('listitem').filter({ hasText: 'Llamar al dentista' });

  await tarea.getByRole('button', { name: 'Borrar' }).click();

  await expect(page.getByRole('alert')).toHaveText('Error al borrar la tarea');
  await expect(tarea).toHaveCount(1);

  await request.delete(`/tareas/${id}`);
});
