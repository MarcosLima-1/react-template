import { useCallback, useState } from "react";

type UseToggleReturn = [boolean, () => void, (value: boolean) => void];

export function useToggle(initialValue: boolean = false, onToggle?: (value: boolean) => void): UseToggleReturn {
	const [value, setValue] = useState<boolean>(initialValue);

	const toggle = useCallback(() => {
		setValue((prev) => {
			const newValue = !prev;
			onToggle?.(newValue);
			return newValue;
		});
	}, [onToggle]);

	const setToggle = useCallback(
		(newValue: boolean) => {
			setValue(newValue);
			onToggle?.(newValue);
		},
		[onToggle],
	);

	return [value, toggle, setToggle];
}
