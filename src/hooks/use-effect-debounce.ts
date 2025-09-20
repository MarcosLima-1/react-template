import { type DependencyList, useEffect } from "react";

export function useEffectDebounce(callback: () => void, delay: number, deps: DependencyList) {
	useEffect(() => {
		const timeout = setTimeout(callback, delay);

		return () => {
			clearTimeout(timeout);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callback, delay, ...deps]);
}
