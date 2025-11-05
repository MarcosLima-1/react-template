const mainKeys = {
	users: { single: "user", many: "users" },
};

export const queryKeys = {
	session: () => ["session"] as const,
	user: {
		all: () => [mainKeys.users.many] as const,
		byUserId: (userId: string) => [mainKeys.users.single, { userId }] as const,
	},
} as const;

// 1. Tipo utilitário que percorre e extrai os tipos de retorno
type FlattenObjectValues<T> = T extends Record<string, unknown>
	? T extends (...args: unknown[]) => unknown // Se for uma função, retorne o tipo de retorno
		? ReturnType<T>
		: {
				[K in keyof T]: FlattenObjectValues<T[K]>; // Caso contrário, mergulhe no objeto
			}[keyof T] // Pegue a união de todos os tipos de retorno/valores
	: T;

export type QueryKey = FlattenObjectValues<typeof queryKeys>;
