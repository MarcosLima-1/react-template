import z from "zod/v4";

export const numberPaginationParams = z.object({
	page: z.coerce.number().int().nonnegative().catch(1),
	limit: z.coerce.number().int().positive().max(100).catch(10),
});

export const cursorPaginationParams = z.object({
	cursor: z.coerce.number().int().nonnegative().nullable().catch(null),
	limit: z.coerce.number().int().positive().max(100).catch(10),
});

export type CursorPaginationParams = z.infer<typeof cursorPaginationParams>;
export type NumberPaginationParams = z.infer<typeof numberPaginationParams>;

export interface ApiResponse<TData, TMeta = void> {
	data: TData;
	meta?: TMeta;
}

export interface CursorMetaResponse {
	prevCursor: string | null;
	nextCursor: string | null;
}

export type NumberPaginationMetaResponse = {
	totalCount: number;
};

export type CursorPaginationResponse<TData> = ApiResponse<TData, CursorMetaResponse>;
export type NumberPaginationResponse<TData> = ApiResponse<TData, NumberPaginationMetaResponse>;

export type Cursor = number | null;
