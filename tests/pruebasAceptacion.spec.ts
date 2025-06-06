import { test, expect } from "@playwright/test";

const LOGIN_PAGE_URL = "http://localhost:4321/login";

test.describe("Pruebas de Autenticación de Usuario", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE_URL);
  });

  test("PU01_CORREO_VACIO: Inicio de sesión con campo correo vacío", async ({
    page,
  }) => {
    const loginButton = page.getByRole("button", { name: "Login" });
    const errorMessage = page.locator("#errorMessage");

    await loginButton.click();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      "Por favor ingrese un correo válido que contenga '@' y '.'."
    );
  });
  test("PU02_CONTRASENA_VACIA: Inicio de sesión con campo contraseña vacío", async ({
    page,
  }) => {
    const emailInput = page.getByLabel("Usuario");
    const loginButton = page.getByRole("button", { name: "Login" });
    const errorMessage = page.locator("#errorMessage");

    await emailInput.fill("usuario@ejemplo.com");
    await loginButton.click();

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      "La contraseña debe tener entre 8 y 12 caracteres."
    );
  });

  test("PU03_CORREO_INEXISTENTE: Autenticación con correo inexistente", async ({
    page,
  }) => {
    const emailInput = page.getByLabel("Usuario");
    const passwordInput = page.getByLabel("Contraseña");
    const loginButton = page.getByRole("button", { name: "Login" });
    const errorMessage = page.locator("#errorMessage");

    await emailInput.fill("correo.inexistente@ejemplo.com");
    await passwordInput.fill("123456789");
    await loginButton.click();

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      "Autenticación fallida. Por favor, revise sus credenciales."
    );
  });

  test("PU04_LOGIN_CORRECTO: Autenticación con inicio de sesión correcto", async ({
    page,
  }) => {
    const emailInput = page.getByLabel("Usuario");
    const passwordInput = page.getByLabel("Contraseña");
    const loginButton = page.getByRole("button", { name: "Login" });

    await emailInput.fill("yerson@gmail.com");
    await passwordInput.fill("123456789");
    await loginButton.click();
    await expect(page).toHaveURL(/\/gestion$/);
  });
});
