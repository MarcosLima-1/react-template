import type { QueryKey } from "@tanstack/react-query";
import { type Draft, produce } from "immer";
import { queryClient } from "@/lib/tanstack-query/client";

interface UpdateQueryItemProps<T> {
	queryKey: QueryKey;
	exact?: boolean;
	/**
	 * Uma função que recebe um rascunho (draft) do item e o modifica diretamente.
	 * O Immer cuidará da imutabilidade nos bastidores.
	 */
	updater: (page: Draft<T>) => void;
}

/**
 * Atualiza um item dentro dos dados de uma `query` de forma imutável.
 *
 * @param queryKey A chave da query a ser atualizada.
 * @param updater A função que encontra e modifica o item.
 */
export function updateQueryItem<T>({ queryKey, updater, exact = false }: UpdateQueryItemProps<T>) {
	queryClient.setQueriesData<T>({ queryKey: queryKey, exact }, (data) => {
		if (!data) return undefined;

		return produce(data, (draft) => {
			updater(draft);
		});
	});
}
