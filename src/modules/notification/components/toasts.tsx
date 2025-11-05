import { toastBase } from "@/modules/notification/components/toast-base";
import type { ToastBaseProps } from "@/modules/notification/types/toast-base";

export const toast = {
	error: (toast: Omit<ToastBaseProps, "id" | "variants">) => toastBase({ ...toast, variants: "error" }),
	success: (toast: Omit<ToastBaseProps, "id" | "variants">) => toastBase({ ...toast, variants: "success" }),
	warning: (toast: Omit<ToastBaseProps, "id" | "variants">) => toastBase({ ...toast, variants: "warning" }),
	info: (toast: Omit<ToastBaseProps, "id" | "variants">) => toastBase({ ...toast, variants: "info" }),
};
