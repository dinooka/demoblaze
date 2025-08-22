import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 0 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? "github" : "html",
	timeout: 30_000,
	expect: { timeout: 10_000 },
	use: {
		baseURL: "https://www.demoblaze.com",
		trace: "on-first-retry",
		headless: true,
	},

	projects: [
		{
			name: "setup",
			use: { ...devices["Desktop Chrome"] },
			testMatch: /.*\.setup\.ts/,
		},
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				storageState: ".auth/session-data.json",
			},
			dependencies: ["setup"],
		},
	],
});
