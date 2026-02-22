import { toastManager } from "@/modules/notification/lib/toast-manager";
import type { ToastProps, variants } from "@/modules/notification/types/toast-base";

function add(props: ToastProps, type: variants) {
	return toastManager.add({
		...props,
		type,
		data: {
			...props.data,
			variant: type,
		},
	});
}

/**
 * Programmatic toast API.
 *
 * @example
 * toast.success({ title: "Saved!", description: "Your changes were saved." });
 * toast.error({ title: "Error", description: "Something went wrong.", button: { label: "Retry", onClick: () => {} } });
 */
export const toast = {
	error: (input: ToastProps) => add(input, "error"),
	success: (input: ToastProps) => add(input, "success"),
	warning: (input: ToastProps) => add(input, "warning"),
	info: (input: ToastProps) => add(input, "info"),
};
