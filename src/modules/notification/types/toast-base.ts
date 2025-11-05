export type variants = "success" | "error" | "warning" | "info";

export interface ToastBaseProps {
	id: string | number;
	title: string;
	description?: string;
	variants?: variants;
	button?: {
		label: string;
		onClick: () => void;
	};
}
