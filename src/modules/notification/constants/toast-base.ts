import { CircleAlertIcon, CircleCheckIcon, CircleXIcon, InfoIcon, type LucideIcon } from "lucide-react";
import type { variants } from "@/modules/notification/types/toast-base";

export interface ToastMetaProps {
	icon: LucideIcon;
	bgColor: string;
	iconColor: string;
}

export const toastMeta: Record<variants, ToastMetaProps> = {
	error: {
		bgColor: "from-destructive/10",
		iconColor: "fill-destructive",
		icon: CircleXIcon,
	},
	info: {
		bgColor: "from-info/10",
		iconColor: "fill-info",
		icon: InfoIcon,
	},
	success: {
		bgColor: "from-success/10",
		iconColor: "fill-success",
		icon: CircleCheckIcon,
	},
	warning: {
		bgColor: "from-warn/10",
		iconColor: "fill-warn",
		icon: CircleAlertIcon,
	},
};

export function getToastMeta(variant?: variants): ToastMetaProps {
	if (!variant || !toastMeta[variant]) {
		console.warn(`Unknown toast variant: ${variant}. Falling back to 'info'.`);
		return toastMeta.info;
	}

	return toastMeta[variant];
}
