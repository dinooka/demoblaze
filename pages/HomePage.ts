import { Locator, Page } from "@playwright/test";
import { newPerson } from "../test-data/userData";

export default class HomePage {
	readonly page: Page;
	readonly pageTitle: Locator;
	readonly signUpLink: Locator;
	readonly logInLink: Locator;
	readonly signupUsername: Locator;
	readonly signupPassword: Locator;
	readonly loginUsername: Locator;
	readonly loginPassword: Locator;
	readonly loginButton: Locator;
	readonly signupButton: Locator;
	readonly welcomeMessage: Locator;
	readonly laptopsCategory: Locator;
	readonly sonyLaptops: Locator;
	readonly sonyVaioI5: Locator;
	readonly sonyVaioI7: Locator;

	constructor(page: Page) {
		this.page = page;
		this.signUpLink = page.getByRole("link", { name: "Sign up" });
		this.signupUsername = page.getByRole("textbox", { name: "Username:" });
		this.signupPassword = page.getByRole("textbox", { name: "Password:" });
		this.signupButton = page.getByRole("button", { name: "Sign up" });
		this.logInLink = page.getByRole("link", { name: "Log in" });
		this.loginUsername = page.locator("#loginusername");
		this.loginPassword = page.locator("#loginpassword");
		this.loginButton = page.getByRole("button", { name: "Log in" });
		this.welcomeMessage = page.locator("#nameofuser");
		this.laptopsCategory = page.getByRole("link", { name: "Laptops" });
		this.sonyVaioI5 = page.locator(".card-title a:has-text('Sony vaio i5')");
		this.sonyVaioI7 = page.locator(".card-title a:has-text('Sony vaio i7')");
	}
	async userRegistration() {
		await this.signUpLink.click();
		await this.signupUsername.click();
		await this.signupUsername.fill(newPerson.username);
		await this.signupPassword.fill(newPerson.password);
		await this.signupButton.click();
		return { username: newPerson.username, password: newPerson.password };
	}
	async userLogin(fName: string, password: string) {
		await this.logInLink.click();
		await this.loginUsername.fill(fName);
		await this.loginPassword.fill(password);
		await this.loginButton.click();
	}
	async selectFirstLaptop() {
		await this.sonyVaioI5.click();
	}

	async selectSecondLaptop() {
		await this.page.goto("/");
		await this.laptopsCategory.click();
		await this.sonyVaioI7.click();
	}
}
