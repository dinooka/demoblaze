import { cleanEnv, str } from "envalid";
import "dotenv/config";

export const env = cleanEnv(process.env, {
	API_URL: str({ desc: "URL of the API" }),
});
