import { z } from "zod/v4";
import { type User, userSchema } from "@/schemas/user";

export interface AuthResponse {
	accessToken: string;
	user: User;
}

export interface SaveSessionDataProps {
	accessToken?: string;
	session?: SessionProps;
}

export const sessionSchema = z.object({
	user: userSchema,
});

export type SessionProps = z.infer<typeof sessionSchema>;
