import { faker } from "@faker-js/faker";
import z from "zod/v4";

export const userRoleEnum = z.enum(["USER", "ADMIN"]);
export const userStatusEnum = z.enum(["EMAIL_CONFIRMATION_PENDING", "ACTIVE", "INACTIVE"]);
export const userPlanEnum = z.enum(["FREE", "BASIC", "PREMIUM"]);

export const UserSchema = z.object({
	id: z.uuid("ID do usuário deve ser um UUID válido."),
	name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
	email: z.email("Formato de e-mail inválido.").optional(),
	createdAt: z.string("Formato de data e hora inválido para 'createdAt'."),
	role: userRoleEnum.default("USER"),
	status: userStatusEnum.default("EMAIL_CONFIRMATION_PENDING"),
	plan: userPlanEnum.default("FREE"),
	avatarUrl: z.url("URL do avatar inválida.").nullable().default(null),
});

export type User = z.infer<typeof UserSchema>;
export type UserRole = z.infer<typeof userRoleEnum>;
export type UserStatus = z.infer<typeof userStatusEnum>;
export type UserPlan = z.infer<typeof userPlanEnum>;

/**
 * Cria e retorna um único objeto mockado que adere ao UserSchema.
 * Utiliza o faker para gerar dados realistas, respeitando os enums e tipos.
 *
 * @param {Partial<User>} [overrides={}] Opcional: Propriedades para sobrescrever os valores mockados.
 * @returns {User} Um objeto User mockado e validado.
 */
export function createMockUser(overrides: Partial<User> = {}): User {
	const roles = userRoleEnum.options;
	const statuses = userStatusEnum.options;
	const plans = userPlanEnum.options;

	const createdAtDate = faker.date.past({ years: 1 });

	const mockData: User = {
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		email: faker.internet.email(),
		createdAt: createdAtDate.toISOString(),
		role: faker.helpers.arrayElement(roles),
		status: faker.helpers.arrayElement(statuses),
		plan: faker.helpers.arrayElement(plans),
		avatarUrl: faker.helpers.arrayElement([faker.image.avatar(), null]),
		...overrides,
	};

	return UserSchema.parse(mockData);
}
