import { useRef } from "react";

type Callback<T> = (value: T) => void;

export function useDebounce<T>(callback: Callback<T>, delay: number) {
	type TimeoutType = ReturnType<typeof setTimeout> | null;
	const timeoutId = useRef<TimeoutType>(null);

	return (value: T) => {
		if (timeoutId.current) {
			clearTimeout(timeoutId.current);
		}

		timeoutId.current = setTimeout(() => {
			callback(value);
		}, delay);
	};
}
