import { expect, test } from "@playwright/test";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display sign in modal when clicking Sign In button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("should display sign up modal when clicking Sign Up button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign Up" }).click();

    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Confirm Password")).toBeVisible();
  });

  test("should close auth modal when clicking X button", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    // Click the X button (close button in modal)
    await page.locator('button[class*="text-gray-400"]').first().click();

    await expect(
      page.getByRole("heading", { name: "Sign In" })
    ).not.toBeVisible();
  });

  test("should switch between sign in and sign up modes", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    // Switch to sign up
    await page.getByText(/Don't have an account/i).click();
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();

    // Switch back to sign in
    await page.getByText(/Already have an account/i).click();
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  });

  test("should show OAuth buttons in auth modal", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(
      page.getByRole("button", { name: /continue with google/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /continue with github/i })
    ).toBeVisible();
  });

  test("should validate password match on sign up", async ({ page }) => {
    await page.getByRole("button", { name: "Sign Up" }).click();

    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel(/^Password$/).fill("password123");
    await page.getByLabel("Confirm Password").fill("password456");

    await page.getByRole("button", { name: /sign up/i }).click();

    await expect(page.getByText("Passwords do not match")).toBeVisible();
  });

  test("should validate password length on sign up", async ({ page }) => {
    await page.getByRole("button", { name: "Sign Up" }).click();

    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel(/^Password$/).fill("12345");
    await page.getByLabel("Confirm Password").fill("12345");

    await page.getByRole("button", { name: /sign up/i }).click();

    await expect(
      page.getByText("Password must be at least 6 characters")
    ).toBeVisible();
  });

  test("should show loading state during sign in", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In" }).click();

    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("password123");

    await page.getByRole("button", { name: /sign in/i }).click();

    // Should show loading state briefly
    await expect(page.getByText("Signing in...")).toBeVisible();
  });

  test("should show loading state during sign up", async ({ page }) => {
    await page.getByRole("button", { name: "Sign Up" }).click();

    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel(/^Password$/).fill("password123");
    await page.getByLabel("Confirm Password").fill("password123");

    await page.getByRole("button", { name: /sign up/i }).click();

    // Should show loading state briefly
    await expect(page.getByText("Signing up...")).toBeVisible();
  });

  test("should display navigation items in header", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Matches" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Predict" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Teams" })).toBeVisible();
  });

  test("should navigate to predict page (protected route test)", async ({
    page,
  }) => {
    // Try to access predict page without being logged in
    await page.goto("/predict");

    // Should redirect to home page (middleware protection)
    await expect(page).toHaveURL("/");
  });

  test("should display logo in header", async ({ page }) => {
    const logo = page.locator('img[alt*="logo" i]').or(page.locator("svg"));
    await expect(logo.first()).toBeVisible();
  });

  test.describe("Mobile responsive", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("should display mobile header correctly", async ({ page }) => {
      await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
    });

    test("should open auth modal on mobile", async ({ page }) => {
      await page.getByRole("button", { name: "Sign In" }).click();
      await expect(
        page.getByRole("heading", { name: "Sign In" })
      ).toBeVisible();
    });
  });
});
