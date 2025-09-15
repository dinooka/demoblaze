import { test, expect } from "./axe-test";

// This TC use fixture created in axe-test.ts
test("Acs issues using custom fixture", async ({ page, configAxe }) => {
	await page.goto("/");

	const accessibilityScanResults = await configAxe().analyze();

	expect(accessibilityScanResults.violations).toEqual([]);
});
