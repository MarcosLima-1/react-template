import { Select as BaseUiSelect } from "@base-ui/react/select";
import { cn } from "@/utils/cn";

function Select({ ...props }: React.ComponentProps<typeof BaseUiSelect.Root>) {
	return <BaseUiSelect.Root {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof BaseUiSelect.Group>) {
	return <BaseUiSelect.Group {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof BaseUiSelect.Value>) {
	return <BaseUiSelect.Value {...props} />;
}

function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseUiSelect.Trigger>) {
	return (
		<BaseUiSelect.Trigger
			className={cn(
				"flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-2",
				className,
			)}
			{...props}
		>
			{children}
			<BaseUiSelect.Icon />
		</BaseUiSelect.Trigger>
	);
}

function SelectContent({ className, children, ...props }: React.ComponentProps<typeof BaseUiSelect.Popup>) {
	return (
		<BaseUiSelect.Portal>
			<BaseUiSelect.Popup className={cn("z-50 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-md", className)} {...props}>
				{children}
			</BaseUiSelect.Popup>
		</BaseUiSelect.Portal>
	);
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof BaseUiSelect.Item>) {
	return (
		<BaseUiSelect.Item
			className={cn("relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100", className)}
			{...props}
		>
			{children}
			<BaseUiSelect.ItemIndicator />
		</BaseUiSelect.Item>
	);
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof BaseUiSelect.Separator>) {
	return <BaseUiSelect.Separator className={cn("my-1 h-px bg-gray-200", className)} {...props} />;
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof BaseUiSelect.GroupLabel>) {
	return <BaseUiSelect.GroupLabel className={cn("px-2 py-1 text-gray-500 text-xs", className)} {...props} />;
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue };
