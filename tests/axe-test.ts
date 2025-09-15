import { test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

type axe = {
	configAxe: () => AxeBuilder;
};

// This new "test" can be used in multiple test files, and each of them will get
// a consistently configured AxeBuilder instance.
export const test = base.extend<axe>({
	configAxe: async ({ page }, use) => {
		const configAxe = () =>
			new AxeBuilder({ page }).withTags([
				"wcag2a",
				"wcag2aa",
				"wcag21a",
				"wcag21aa",
				"wcag22aa",
			]);
		await use(configAxe);
	},
});
export { expect } from "@playwright/test";
