import type { ToastManagerAddOptions } from "@base-ui/react/toast";

export type variants = "success" | "error" | "warning" | "info";

/** @internal Data payload carried inside the Base UI toast object */
export type ToastData = { variant: "success" | "error" | "warning" | "info" };

export type ToastProps = ToastManagerAddOptions<ToastData>;
