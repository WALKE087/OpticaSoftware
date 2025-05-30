import { test, expect } from "@playwright/test";

test.describe("Pacientes - Registrar Paciente", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321/login");
    await page.fill("#username", "yerson@gmail.com");
    await page.fill("#password", "123456789");
    await page.click("button[type=submit]");

    await page.waitForURL("http://localhost:4321/gestion");
    await page.goto("http://localhost:4321/gestion?view=gestion-pacientes");
  });

  test("PA_Cp4_RegistroExitoso: Adición exitosa de paciente con todos los campos válidos", async ({
    page,
  }) => {
    const nuevoPaciente = {
      nombreCompleto: "Ana Sofía Playwright",
      documento: `9${Math.floor(Math.random() * 1000000000)
        .toString()
        .padStart(9, "0")}`,
      fechaNacimiento: "1985-07-22",
      sexoValue: "F",
      telefono: "3109876543",
      email: `ana.playwright.${Date.now()}@example.com`,
    };

    const addButton = page.locator('button[id="abrirModalAgregarPaciente"]');
    await addButton.waitFor({ state: "visible", timeout: 15000 });
    await addButton.click();
    await expect(page.locator("#agregarPacienteModal")).toBeVisible();
    await page.locator("#nombre_completo").fill(nuevoPaciente.nombreCompleto);
    await page.locator("#documento_identidad").fill(nuevoPaciente.documento);
    await page.locator("#fecha_nacimiento").fill(nuevoPaciente.fechaNacimiento);
    await page
      .locator("#sexo")
      .selectOption({ value: nuevoPaciente.sexoValue });
    await page.locator("#telefono_contacto").fill(nuevoPaciente.telefono);
    await page.locator("#correo_electronico").fill(nuevoPaciente.email);

    const reloadPromise = page.waitForNavigation({
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    await page.locator("#guardarPacienteBtn").click();
    await expect(page.locator("#formSuccessMessage")).toHaveText(
      "¡Paciente agregado exitosamente!",
      { timeout: 5000 }
    );

    await expect(page.locator("#agregarPacienteModal")).toBeHidden({
      timeout: 2000,
    });
    await reloadPromise;
    const tableBody = page.locator("#pacienteTableBody");

    const pacienteRow = tableBody.locator(
      `tr:has-text("${nuevoPaciente.nombreCompleto}")`
    );
    await expect(pacienteRow).toBeVisible({ timeout: 10000 });

    await expect(
      pacienteRow.locator(`td:text-is("${nuevoPaciente.nombreCompleto}")`)
    ).toBeVisible();
    await expect(
      pacienteRow.locator(`td:text-is("${nuevoPaciente.documento}")`)
    ).toBeVisible();

    const [year, month, day] = nuevoPaciente.fechaNacimiento.split("-");
    const formattedDateForTable = `${day}/${month}/${year}`;
    await expect(
      pacienteRow.locator(`td:text-is("${formattedDateForTable}")`)
    ).toBeVisible();

    await expect(
      pacienteRow.locator(`td:text-is("${nuevoPaciente.sexoValue}")`)
    ).toBeVisible();
    await expect(
      pacienteRow.locator(`td:text-is("${nuevoPaciente.telefono}")`)
    ).toBeVisible();
    await expect(
      pacienteRow.locator(`td:text-is("${nuevoPaciente.email}")`)
    ).toBeVisible();
  });
});
