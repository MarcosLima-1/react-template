import {
	Menu as DropdownMenuBaseUi,
	type MenuBackdropProps,
	type MenuCheckboxItemProps,
	type MenuGroupLabelProps,
	type MenuGroupProps,
	type MenuItemProps,
	type MenuPopupProps,
	type MenuPortalProps,
	type MenuPositionerProps,
	type MenuRadioGroupProps,
	type MenuRadioItemProps,
	type MenuRootProps,
	type MenuSubmenuRootProps,
	type MenuSubmenuTriggerProps,
	type MenuTriggerProps,
} from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "tailwind-variants";

function DropdownMenuRoot({ ...props }: MenuRootProps) {
	return <DropdownMenuBaseUi.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPortalProps) {
	return <DropdownMenuBaseUi.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuTriggerProps) {
	return <DropdownMenuBaseUi.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuBackdrop({ className, ...props }: MenuBackdropProps) {
	return (
		<DropdownMenuBaseUi.Backdrop
			className={cn(className, [
				// Base styles
				"fixed inset-0 min-h-dvh bg-black",
				"supports-[-webkit-touch-callout:none]:absolute",
				// Animations
				"opacity-20 transition-all duration-150",
				"data-ending-style:opacity-0 data-starting-style:opacity-0",
				// Dark mode
				"dark:opacity-70",
			])}
			{...props}
		/>
	);
}

function DropdownMenuPositioner({ className, ...props }: MenuPositionerProps) {
	return <DropdownMenuBaseUi.Positioner className={cn(className, "outline-none")} {...props} />;
}

function DropdownMenuPopup({ className, ...props }: MenuPopupProps) {
	return (
		<DropdownMenuBaseUi.Popup
			className={cn(className, [
				// Base styles
				"min-w-32 overflow-y-auto overflow-x-hidden rounded-lg bg-card p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10",
				// Animations
				"origin-(--transform-origin) transition-[transform,scale,opacity] duration-100",
				"data-ending-style:scale-90 data-starting-style:scale-90",
				"data-ending-style:opacity-0 data-starting-style:opacity-0",
				// Dark mode
				"dark:shadow-none",
			])}
			{...props}
		/>
	);
}

function DropdownMenuGroup({ ...props }: MenuGroupProps) {
	return <DropdownMenuBaseUi.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuItem({
	className,
	inset,
	variant = "default",
	...props
}: MenuItemProps & {
	inset?: boolean;
	variant?: "default" | "destructive";
}) {
	return (
		<DropdownMenuBaseUi.Item
			data-slot="dropdown-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				[
					// Base styles
					"group/dropdown-menu-item relative flex cursor-pointer select-none items-center gap-1.5 rounded-md px-1.5 py-1 text-sm leading-4 outline-none outline-hidden",
					// Disabled state
					"data-disabled:pointer-events-none data-disabled:opacity-50",
					// SVG selector
					"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
					// Highlight states
					"data-highlighted:bg-accent data-highlighted:text-accent-foreground",
				],
				className,
			)}
			{...props}
		/>
	);
}

function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: MenuCheckboxItemProps & {
	children?: React.ReactNode;
}) {
	return (
		<DropdownMenuBaseUi.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={cn(
				[
					// Base styles
					"grid cursor-default select-none grid-cols-[0.75rem_1fr] items-center gap-2",
					"py-2 pr-8 pl-2.5 text-sm outline-none",
					// Highlight states
					"data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50",
					"data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1]",
					"data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900",
				],
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<DropdownMenuBaseUi.CheckboxItemIndicator>
					<CheckIcon className="size-4" />
				</DropdownMenuBaseUi.CheckboxItemIndicator>
			</span>
			{children}
		</DropdownMenuBaseUi.CheckboxItem>
	);
}

function DropdownMenuRadioGroup({ ...props }: MenuRadioGroupProps) {
	return <DropdownMenuBaseUi.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({
	className,
	children,
	...props
}: MenuRadioItemProps & {
	children?: React.ReactNode;
}) {
	return (
		<DropdownMenuBaseUi.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={cn(
				[
					// Base styles
					"relative flex cursor-default select-none items-center gap-2 rounded-sm",
					"py-1.5 pr-2 pl-8 text-sm outline-hidden",
					// SVG selector
					"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
					// Interactive states
					"focus:bg-accent focus:text-accent-foreground",
					"data-disabled:pointer-events-none data-disabled:opacity-50",
				],
				className,
			)}
			{...props}
		>
			<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<DropdownMenuBaseUi.RadioItemIndicator>
					<CircleIcon className="size-2 fill-current" />
				</DropdownMenuBaseUi.RadioItemIndicator>
			</span>
			{children}
		</DropdownMenuBaseUi.RadioItem>
	);
}

function DropdownMenuGroupLabel({
	className,
	inset,
	...props
}: MenuGroupLabelProps & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuBaseUi.GroupLabel
			data-slot="dropdown-menu-group-label"
			data-inset={inset}
			className={cn("px-1.5 py-1 font-medium text-muted-foreground text-xs data-[inset]:pl-8", className)}
			{...props}
		/>
	);
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<DropdownMenuBaseUi.Separator data-slot="dropdown-menu-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
	);
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn("ml-auto text-muted-foreground text-xs tracking-widest", className)}
			{...props}
		/>
	);
}

function DropdownMenuSubmenuRoot({ ...props }: MenuSubmenuRootProps) {
	return <DropdownMenuBaseUi.SubmenuRoot data-slot="dropdown-menu-submenu-root" {...props} />;
}

function DropdownMenuSubmenuTrigger({
	className,
	inset,
	children,
	...props
}: MenuSubmenuTriggerProps & {
	inset?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<DropdownMenuBaseUi.SubmenuTrigger
			data-slot="dropdown-menu-submenu-trigger"
			data-inset={inset}
			className={cn(
				[
					// Base styles
					"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden",
					// Interactive states
					"focus:bg-accent focus:text-accent-foreground",
					"data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
					// Responsive
					"data-inset:pl-8",
				],
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ml-auto size-4" />
		</DropdownMenuBaseUi.SubmenuTrigger>
	);
}

interface DropdownMenuContentProps extends MenuPopupProps {
	children: React.ReactNode;
	showBackdrop?: boolean;
	backdropProps?: MenuBackdropProps;
	positionerProps?: MenuPositionerProps;
	popupProps?: MenuPopupProps;
	portalProps?: MenuPortalProps;
}

function DropdownMenuContent({
	children,
	showBackdrop = false,
	backdropProps,
	positionerProps,
	popupProps,
	portalProps,
	...props
}: DropdownMenuContentProps) {
	return (
		<DropdownMenuPortal {...portalProps}>
			{showBackdrop && <DropdownMenuBackdrop {...backdropProps} />}
			<DropdownMenuPositioner {...positionerProps}>
				<DropdownMenuPopup {...props}>{children}</DropdownMenuPopup>
			</DropdownMenuPositioner>
		</DropdownMenuPortal>
	);
}

export const DropdownMenu = {
	Root: DropdownMenuRoot,
	Portal: DropdownMenuPortal,
	Trigger: DropdownMenuTrigger,
	Backdrop: DropdownMenuBackdrop,
	Positioner: DropdownMenuPositioner,
	Popup: DropdownMenuPopup,
	Content: DropdownMenuContent,
	Group: DropdownMenuGroup,
	Item: DropdownMenuItem,
	CheckboxItem: DropdownMenuCheckboxItem,
	RadioGroup: DropdownMenuRadioGroup,
	RadioItem: DropdownMenuRadioItem,
	GroupLabel: DropdownMenuGroupLabel,
	Separator: DropdownMenuSeparator,
	Shortcut: DropdownMenuShortcut,
	SubmenuRoot: DropdownMenuSubmenuRoot,
	SubmenuTrigger: DropdownMenuSubmenuTrigger,
};
