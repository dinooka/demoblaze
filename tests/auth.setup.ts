import { test as setup, expect } from "@playwright/test";
import HomePage from "../pages/HomePage";

const userDataFile = ".auth/session-data.json";

setup.skip("User Registration & Login", async ({ page }) => {
	await page.goto("/");
	const homePage = new HomePage(page);
	const user = await homePage.userRegistration();
	await homePage.userLogin(user.username, user.password);
	await expect(homePage.welcomeMessage).toContainText("Welcome");
	await page.context().storageState({ path: userDataFile });
});
