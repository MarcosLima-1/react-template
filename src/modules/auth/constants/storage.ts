import type { CookieAttributes } from "node_modules/@types/js-cookie";
import { envs } from "@/lib/envs";

const isDevelopment = envs.VITE_IS_DEVELOPMENT;

export const SESSION_KEY = "session";
export const TOKEN_KEY = "accessToken";

export const defaultCookiesConfig: CookieAttributes = {
	expires: 1,
	sameSite: "strict",
	secure: !isDevelopment,
	path: "/",
};
