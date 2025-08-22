import { test, expect } from "@playwright/test";
import sonyLaptops from "../test-data/sony-laptops.json";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import { env } from "../types/type";

const homePageTitle = "STORE";
const orderSuccessMessage = "Thank you for your purchase!";

test.use({ storageState: ".auth/session-data.json" });
test.describe.serial("Verify order placement for a registered user", () => {
	test("Search for Sony Laptops", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveTitle(homePageTitle);
		await page.route(env.API_URL, async (route) => {
			await page.waitForTimeout(2000);
			await route.fulfill({
				contentType: "application/json",
				body: JSON.stringify(sonyLaptops),
			});
		});

		const homePage = new HomePage(page);
		await homePage.laptopsCategory.click();
		await page.waitForResponse(env.API_URL);
		await expect(homePage.sonyVaioI5).toBeVisible();
	});

	test("Add products to cart", async ({ page }) => {
		await page.goto("/");
		const homePage = new HomePage(page);
		await homePage.selectFirstLaptop();

		const productPage = new ProductPage(page);
		await productPage.addProductToCart();
		await homePage.selectSecondLaptop();
		await productPage.addProductToCart();
		await productPage.navigateToCartPage();

		const cartPage = new CartPage(page);
		await expect(cartPage.productTable).toBeVisible();
	});
	test("Place the order", async ({ page }) => {
		await page.goto("/");
		const productPage = new ProductPage(page);
		await productPage.navigateToCartPage();

		const cartPage = new CartPage(page);
		await cartPage.deleteProduct();
		await cartPage.placeOrder();
		await expect(cartPage.successMessage).toContainText(orderSuccessMessage);
	});
});
