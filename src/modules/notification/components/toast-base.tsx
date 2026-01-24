import { toast as sonnerToast } from "sonner";
import { RoundedIcon } from "@/components/misc/rounded-icon";
import { Button } from "@/components/ui/button";
import { toastMeta } from "@/modules/notification/constants/toast-base";
import type { ToastBaseProps } from "@/modules/notification/types/toast-base";

function ToastBase({ variants = "success", title, description, button }: ToastBaseProps) {
	const Icon = toastMeta[variants].icon;
	const bgColor = toastMeta[variants].bgColor;
	const iconColor = toastMeta[variants].iconColor;

	return (
		<div className="relative flex w-[300px] max-w-svw items-center overflow-hidden rounded-md border bg-background p-2">
			<div className={`absolute top-0 left-0 size-full bg-linear-to-r via-transparent to-transparent ${bgColor}`} />
			<RoundedIcon className="p-0">
				<Icon size={25} className={`${iconColor} stroke-accent`} />
			</RoundedIcon>
			<div className="ml-4">
				<p className="font-bold text-sm">{title}</p>
				<p className="text-muted-foreground text-xs">{description}</p>
			</div>
			{button && (
				<Button onClick={button.onClick} className="ml-2" size="sm">
					{button.label}
				</Button>
			)}
		</div>
	);
}

export function toastBase(toast: Omit<ToastBaseProps, "id">) {
	return sonnerToast.custom((id) => <ToastBase id={id} description={toast.description} title={toast.title} variants={toast.variants} />);
}
