import { expect, Locator, Page } from "@playwright/test";
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
	readonly alertBox: Locator;
	readonly successMessage: Locator;
	readonly okButton: Locator;

	async temp() {
		// await page.getByRole('link', { name: 'Add to cart' }).click();
		// await page.getByRole('link', { name: 'Cart', exact: true }).click();
		// await page.getByRole('button', { name: 'Place Order' }).click();
		// await page.getByRole('textbox', { name: 'Total: 360 Name:' }).click();
		// await page.getByRole('textbox', { name: 'Total: 360 Name:' }).fill('aaa');
		// await page.getByRole('textbox', { name: 'Country:' }).click();
		// await page.getByRole('textbox', { name: 'Country:' }).fill('eee');
		// await page.getByRole('textbox', { name: 'City:' }).click();
		// await page.getByRole('textbox', { name: 'City:' }).fill('www');
		// await page.getByRole('textbox', { name: 'Credit card:' }).click();
		// await page.getByRole('textbox', { name: 'Credit card:' }).fill('1111');
		// await page.getByRole('textbox', { name: 'Month:' }).click();
		// await page.getByRole('textbox', { name: 'Month:' }).fill('2');
		// await page.getByRole('textbox', { name: 'Year:' }).click();
		// await page.getByRole('textbox', { name: 'Year:' }).fill('2009');
		// await page.getByRole('button', { name: 'Purchase' }).click();
		// await page.getByRole('heading', { name: 'Thank you for your purchase!' }).click();
		// await page.getByText('Id: 84950Amount: 360 USDCard').click();
		// await page.locator('.sa-placeholder').click();
		// await page.getByRole('button', { name: 'OK' }).click();
		// await page.getByRole('button', { name: 'OK' }).click();
	}
	constructor(page: Page) {
		this.page = page;
		this.deleteLink = page.locator("//td[contains(text(),'i5')]/../td/a");
		this.placeOrderButton = page.locator(
			'div .btn-success[data-target="#orderModal"]'
		);
		// this.placeOrderButton = page.getByRole("button", { name: "Place Order" });
		// this.customerName = page.locator("#name");
		this.customerName = page.getByRole("textbox", { name: "Name:" });
		// this.country = page.locator("#country");
		this.country = page.getByRole("textbox", { name: "Country:" });
		this.city = page.getByRole("textbox", { name: "City:" });
		// this.city = page.locator("#city");
		this.creditCard = page.getByRole("textbox", { name: "Credit card:" });
		// this.creditCard = page.locator("#card");
		this.month = page.getByRole("textbox", { name: "Month:" });
		// this.month = page.locator("#month");
		this.year = page.getByRole("textbox", { name: "Year:" });
		// this.year = page.locator("#year");
		this.purchaseButton = page.getByRole("button", { name: "Purchase" });
		// this.purchaseButton = page.getByRole("button", {
		// 	name: "Purchase",
		// 	exact: true,
		// });
		this.productTable = page.locator("#tbodyid");
		this.successMessage = page.getByRole("heading", {
			name: "Thank you for your purchase!",
		});
		this.alertBox = page.locator(".showSweetAlert");
		this.okButton = page.getByRole("button", { name: "OK" });
	}

	async waitForTable() {
		await this.productTable.waitFor({ state: "visible" });
	}

	async deleteProduct() {
		await this.productTable.waitFor({ state: "visible" });
		await this.deleteLink.click();
		await this.productTable.waitFor();
		await this.page.waitForTimeout(2_000);
		await expect(this.deleteLink).toBeHidden();
	}

	async placeOrder() {
		await this.waitForTable();
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
		await this.alertBox.waitFor();
		await this.page.waitForTimeout(1_000);
	}
	async clickOkButton() {
		await this.okButton.waitFor();
		await this.okButton.click();
		await this.page.waitForTimeout(1_000);
	}
}
