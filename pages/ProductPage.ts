import { Locator, Page } from "@playwright/test";

export default class ProductPage {
	readonly page: Page;
	readonly addToCartButton: Locator;
	readonly cartLink: Locator;

	constructor(page: Page) {
		this.page = page;
		this.addToCartButton = page.getByRole("link", { name: "Add to cart" });
		this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
	}
	async addProductToCart() {
		const dialogHandler = async (dialog: { accept: () => any }) => {
			await dialog.accept();
		};
		this.page.on("dialog", dialogHandler);
		await this.addToCartButton.click();
		this.page.off("dialog", dialogHandler);
	}

	async navigateToCartPage() {
		await this.cartLink.click();
		await this.page.waitForTimeout(2_000);
	}
}
