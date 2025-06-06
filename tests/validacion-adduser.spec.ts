import { test, expect } from "@playwright/test";

test("Registro exitoso de usuario", async ({ page }) => {
  await page.goto("http://localhost:4321/login");
  await page.fill("#username", "yerson@gmail.com");
  await page.fill("#password", "123456789");
  await page.click("button[type=submit]");

  const addButton = page.locator('button[id="agregarUsuario"]');

  await addButton.waitFor({ state: "visible", timeout: 15000 });

  await addButton.click();

  await page
    .locator("#modalAgregar:not([hidden])")
    .waitFor({ state: "visible", timeout: 10000 });

  await page.fill('input[name="nombre"]', "Juan");
  await page.fill('input[name="apellido"]', "Pérez");
  await page.fill('input[name="correo"]', "juan@mail.com");
  await page.fill('input[name="contraseña"]', "123456789");
  await page.fill('input[name="cedula"]', "1323131232");
  await page.fill('input[name="fechaNacimiento"]', "1990-05-15");
  await page.fill('input[name="fechaExpedicion"]', "2010-05-15");
  await page.selectOption('select[name="rolId"]', { index: 1 });

  await page.route("**/api/agregarUsuario", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Usuario agregado exitosamente",
      }),
    });
  });

  const [response] = await Promise.all([
    page.waitForResponse("**/api/agregarUsuario"),
    page.locator('#modalAgregar button[type="submit"]').click(),
  ]);

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.success).toBeTruthy();
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Usuario agregado exitosamente");
    await dialog.dismiss();
  });
});

test("Validación de correo inválido", async ({ page }) => {
  await page.goto("http://localhost:4321/login");

  await page.fill("#username", "yerson@gmail.com");
  await page.fill("#password", "123456789");
  await page.click('button[type="submit"]');

  const addButton = page.locator("#agregarUsuario");
  await addButton.waitFor({ state: "visible", timeout: 15000 });
  await addButton.click();

  await page
    .locator("#modalAgregar:not([hidden])")
    .waitFor({ state: "visible" });

  await page.fill('input[name="nombre"]', "Juan");
  await page.fill('input[name="apellido"]', "Pérez");
  await page.fill('input[name="correo"]', "juanmail.com");
  await page.click('input[name="contraseña"]');

  const correoInput = page.locator('#modalAgregar input[name="correo"]');

  const isValid = await correoInput.evaluate((el) =>
    (el as HTMLInputElement).checkValidity()
  );
  expect(isValid).toBeFalsy();

  const validationMessage = await correoInput.evaluate(
    (el) => (el as HTMLInputElement).validationMessage
  );
  expect(validationMessage.length).toBeGreaterThan(0);
  expect(validationMessage).toMatch(/@/);
});
