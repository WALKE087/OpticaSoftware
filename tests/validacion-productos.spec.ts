import { test, expect } from "@playwright/test";

test.describe("Gestión de Productos - Agregar Producto", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321/login");
    await page.fill("#username", "yerson@gmail.com");
    await page.fill("#password", "123456789");
    await page.click('button[type="submit"]');

    await page.waitForURL("http://localhost:4321/gestion");

    await page.goto("http://localhost:4321/gestion?view=gestion-productos");
  });

  test("GP_CP1_agregar_exitoso: Debería agregar un producto exitosamente con datos válidos", async ({
    page,
  }) => {
    await page.goto("http://localhost:4321/gestion?view=gestion-productos");

    await page.click("#agregarProducto");

    await expect(page.locator("#modalAgregarProductos")).toBeVisible();

    await page.fill(
      '#formAgregarProducto input[name="nombre"]',
      "Gafas de Sol Clásicas"
    );
    await page.selectOption(
      '#formAgregarProducto select[name="marca"]',
      "RayBan"
    );
    await page.fill('#formAgregarProducto input[name="precio"]', "150.75");
    await page.fill('#formAgregarProducto input[name="stock"]', "100");
    const imagePath = "C:\\Users\\walga\\bitmap.png"; // <-- ¡Aquí tu ruta absoluta!
    await page.setInputFiles("#imagenInput", imagePath);

    await page.selectOption(
      '#formAgregarProducto select[name="tipomontura"]',
      "Full Rim"
    );
    await page.selectOption(
      '#formAgregarProducto select[name="color"]',
      "Black"
    );

    await page.click('#formAgregarProducto button[type="submit"]');

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Producto agregado exitosamente");
      await dialog.accept();
    });

    await expect(page.locator("#modalAgregarProductos")).toBeHidden();

    await page.waitForLoadState("networkidle");
    const productRow = page.locator("table#productTable tr", {
      hasText: "Gafas de Sol Clásicas",
    });
  });

  test("GP_CP2_agregar_nombre_vacio: Debería mostrar alerta y no agregar producto si el nombre está vacío", async ({
    page,
  }) => {
    await page.click("#agregarProducto");

    await expect(page.locator("#modalAgregarProductos")).toBeVisible();

    await page.selectOption(
      '#formAgregarProducto select[name="marca"]',
      "Oakley"
    );
    await page.fill('#formAgregarProducto input[name="precio"]', "75.00");
    await page.fill('#formAgregarProducto input[name="stock"]', "50");
    const imagePath = "C:\\Users\\walga\\bitmap.png";
    await page.setInputFiles("#imagenInput", imagePath);

    await page.selectOption(
      '#formAgregarProducto select[name="tipomontura"]',
      "Half Rim"
    );
    await page.selectOption(
      '#formAgregarProducto select[name="color"]',
      "Silver"
    );
    const nombre = page.locator('#formAgregarProducto input[name="nombre"]');

    const validationMessage = await nombre.evaluate(
      (el) => (el as HTMLInputElement).validationMessage
    );

    await page.click('#formAgregarProducto button[type="submit"]');

    expect(validationMessage.length).toBeGreaterThan(0);
    expect(validationMessage).toMatch(/Please fill out this field./);
  });
});
