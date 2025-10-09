const mainKeys = {
	users: { single: "user", many: "users" },
};

export const queryKeys = {
	session: () => ["session"],
	user: {
		all: () => [mainKeys.users.many],
		byUserId: (userId: string) => [mainKeys.users.single, { userId }],
	},
};
