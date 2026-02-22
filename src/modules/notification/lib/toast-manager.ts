import { Toast } from "@base-ui/react/toast";

/**
 * Global Base UI toast manager.
 * Call `toastManager.add(...)` from anywhere in the app (including outside React).
 * The `<ToastProvider>` in main.tsx subscribes to this instance.
 */
export const toastManager = Toast.createToastManager();
