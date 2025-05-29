import { test, expect } from "@playwright/test";

test.describe("Login - Validaciones", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321/login");
  });

  test("Correo y contraseña vacíos", async ({ page }) => {
    await page.click('button[type="submit"]');
    const error = await page.locator("#errorMessage");
    await expect(error).toBeVisible();
    await expect(error).toContainText("correo válido");
  });

  test("Contraseña muy corta", async ({ page }) => {
    await page.fill("#username", "test@gmail.com");
    await page.fill("#password", "12");
    await page.click('button[type="submit"]');
    const error = await page.locator("#errorMessage");
    await expect(error).toBeVisible();
    await expect(error).toContainText(
      "contraseña debe tener entre 8 y 12 caracteres"
    );
  });

  test("Correo no registrado", async ({ page }) => {
    await page.fill("#username", "noexiste@gmail.com");
    await page.fill("#password", "12345678");
    await page.click('button[type="submit"]');
    const error = await page.locator("#errorMessage");
    await expect(error).toBeVisible();
    await expect(error).toContainText("Autenticación fallida");
  });

  test("Contraseña incorrecta", async ({ page }) => {
    await page.goto("http://localhost:4321/login");
    await page.fill("#username", "yerson@gmail.com");
    await page.fill("#password", "12345678");
    await page.click("button[type=submit]");

    const errorMessage = page.locator("#errorMessage");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Autenticación fallida");
  });

  test("Inicio de sesión exitoso", async ({ page }) => {
    await page.goto("http://localhost:4321/login");
    await page.fill("#username", "yerson@gmail.com");
    await page.fill("#password", "123456789");
    await page.click("button[type=submit]");
  });
});
