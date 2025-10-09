import { z } from "zod/v4";
import { type User, UserSchema } from "@/types/user";

export interface AuthResponse {
	accessToken: string;
	user: User;
}

export interface SaveSessionDataProps {
	accessToken?: string;
	session?: SessionProps;
}

export const sessionSchema = z.object({
	user: UserSchema,
});

export type SessionProps = z.infer<typeof sessionSchema>;
