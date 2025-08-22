import { Locator, Page } from "@playwright/test";
import customerData from "../test-data/order-details.json";

export default class CartPage {
	readonly page: Page;
	readonly deleteLink: Locator;
	readonly placeOrderButton: Locator;
	readonly customerName: Locator;
	readonly country: Locator;
	readonly city: Locator;
	readonly creditCard: Locator;
	readonly month: Locator;
	readonly year: Locator;
	readonly purchaseButton: Locator;
	readonly productTable: Locator;
	readonly successMessage: Locator;

	constructor(page: Page) {
		this.page = page;
		this.deleteLink = page.locator("//td[contains(text(),'i5')]/../td/a");
		this.placeOrderButton = page.locator(
			'div .btn-success[data-target="#orderModal"]'
		);
		this.customerName = page.locator("#name");
		this.country = page.locator("#country");
		this.city = page.locator("#city");
		this.creditCard = page.locator("#card");
		this.month = page.locator("#month");
		this.year = page.locator("#year");
		this.purchaseButton = page.getByRole("button", {
			name: "Purchase",
			exact: true,
		});
		this.productTable = page.locator("#tbodyid");
		this.successMessage = page.locator(".showSweetAlert h2");
	}

	async waitForTable() {
		await this.productTable.waitFor({ state: "visible" });
	}

	async deleteProduct() {
		await this.productTable.waitFor({ state: "visible" });
		await this.deleteLink.click();
	}

	async placeOrder() {
		const newCustomer = customerData.customer[0];
		await this.placeOrderButton.waitFor();
		await this.placeOrderButton.click();
		await this.customerName.fill(newCustomer.name);
		await this.country.fill(newCustomer.country);
		await this.city.fill(newCustomer.city);
		await this.creditCard.fill(newCustomer.creditCard);
		await this.month.fill(newCustomer.month);
		await this.year.fill(newCustomer.year);
		await this.purchaseButton.click();
	}
}
