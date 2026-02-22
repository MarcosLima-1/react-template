import { Toast, type ToastObject } from "@base-ui/react/toast";
import { RoundedIcon } from "@/components/misc/rounded-icon";
import { Button } from "@/components/ui/button";
import { getToastMeta } from "@/modules/notification/constants/toast-base";
import type { ToastData, variants } from "@/modules/notification/types/toast-base";

/**
 * Renders the Base UI toast stack.
 * Must be rendered inside a <Toast.Provider>.
 */
export function ToastViewport() {
	const { toasts } = Toast.useToastManager<ToastData>();

	return (
		<Toast.Portal>
			<Toast.Viewport className="fixed right-2 bottom-2 z-10 mx-auto flex size-full h-fit w-62.5 sm:right-8 sm:bottom-8 sm:w-75">
				{toasts.map((toast) => {
					return (
						<Toast.Root
							key={toast.id}
							toast={toast}
							className="toast-root absolute right-0 bottom-0 left-auto mx-0 my-auto mr-0 box-border w-full select-none rounded-lg border bg-background bg-clip-padding p-4 text-foreground shadow-lg transition-all"
						>
							<BaseToast toast={toast} />
						</Toast.Root>
					);
				})}
			</Toast.Viewport>
		</Toast.Portal>
	);
}

interface BaseToastProps {
	toast: ToastObject<ToastData>;
}

function BaseToast({ toast }: BaseToastProps) {
	const variant = toast.data?.variant as variants;
	const meta = getToastMeta(variant);
	const Icon = meta.icon;
	const actionProps = toast?.actionProps;

	return (
		<Toast.Content className="flex w-full items-center gap-0">
			<div
				className={`pointer-events-none absolute top-0 left-0 size-full bg-linear-to-r via-transparent to-transparent ${meta.bgColor}`}
			/>
			<RoundedIcon className="relative shrink-0 p-0">
				<Icon size={25} className={`${meta.iconColor} stroke-accent`} />
			</RoundedIcon>
			<div className="relative ml-4 min-w-0 flex-1">
				<div className="mb-2">
					<Toast.Title className="font-bold text-sm" />
					<Toast.Description className="text-muted-foreground text-xs" />
				</div>
				{actionProps && (
					<Toast.Action>
						<Button variant="outline" size="sm">
							{actionProps.content}
						</Button>
					</Toast.Action>
				)}
			</div>
		</Toast.Content>
	);
}
