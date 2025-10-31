import type { CookieAttributes } from "node_modules/@types/js-cookie";
import { env } from "@/lib/envs";

const isDevelopment = env.VITE_DEV_MODE;

export const SESSION_KEY = "session";
export const TOKEN_KEY = "accessToken";

export const defaultCookiesConfig: CookieAttributes = {
	expires: 1,
	sameSite: "strict",
	secure: !isDevelopment,
	path: "/",
};
