import { useEffect, useState } from "react";

/**
 * Verifica se o elemento é um campo de entrada de texto.
 * @param element O elemento a ser verificado.
 * @returns `true` se for um input, textarea ou contenteditable.
 */
function isInputElement(element: Element | null): boolean {
	if (!element) {
		return false;
	}

	const tagName = element.tagName.toUpperCase();
	const isContentEditable = (element as HTMLElement).isContentEditable;

	return tagName === "INPUT" || tagName === "TEXTAREA" || isContentEditable;
}

/**
 * Hook que retorna `true` se o foco do usuário estiver em um campo
 * de entrada de texto (input, textarea, contenteditable).
 */
export function useIsInputFocused(): boolean {
	const [isFocused, setIsFocused] = useState(() => isInputElement(document.activeElement));

	useEffect(() => {
		const handleFocusIn = () => {
			setIsFocused(isInputElement(document.activeElement));
		};

		const handleFocusOut = () => {
			setIsFocused(false);
		};

		window.addEventListener("focusin", handleFocusIn);
		window.addEventListener("focusout", handleFocusOut);

		return () => {
			window.removeEventListener("focusin", handleFocusIn);
			window.removeEventListener("focusout", handleFocusOut);
		};
	}, []);

	return isFocused;
}
