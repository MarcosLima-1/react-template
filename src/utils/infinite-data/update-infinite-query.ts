import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import { type Draft, produce } from "immer";
import { queryClient } from "@/lib/tanstack-query";

interface UpdateInfiniteQueryItemProps<T> {
	queryKey: QueryKey;
	exact?: boolean;
	/**
	 * Uma função que recebe um rascunho (draft) da página e o modifica diretamente.
	 * O Immer cuidará da imutabilidade nos bastidores.
	 */
	updater: (page: Draft<T>, index: number) => void;
}

/**
 * Atualiza um item dentro dos dados de uma `InfiniteQuery` de forma imutável.
 *
 * @param queryKey A chave da query a ser atualizada.
 * @param updater A função que encontra e modifica o item dentro de uma página.
 */
export function updateInfiniteQueryItem<T>({ queryKey, updater, exact = false }: UpdateInfiniteQueryItemProps<T>) {
	queryClient.setQueriesData<InfiniteData<T>>({ queryKey: queryKey, exact }, (data) => {
		if (!data) return undefined;

		return produce(data, (draft) => {
			draft.pages.forEach((page, index) => {
				updater(page, index);
			});
		});
	});
}
