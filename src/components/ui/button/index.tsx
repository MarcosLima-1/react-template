import { Button as BaseUiButton, type ButtonProps as BaseUiButtonProps } from "@base-ui/react/button";
import { cn, tv, type VariantProps } from "tailwind-variants";

const shadowVariants = tv({
	base: [
		"transition-all duration-150 ease-[cubic-bezier(0,0,0.58,1)]",

		// 1. Base (Sombra inicial 6px)
		"shadow-[0_var(--shadow-button-size)_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_var(--shadow-button-size)_0_0_rgba(100,100,100,0.2)]",

		// 2. Hover (SÓ aplica se NÃO estiver clicando)
		"hover:not-active:shadow-[0_var(--hovered-shadow-button-size)_0_0_rgba(0,0,0,0.2)] dark:hover:not-active:shadow-[0_var(--hovered-shadow-button-size)_0_0_rgba(100,100,100,0.2)]",
		"hover:not-active:translate-y-0.5",

		// 3. Active (Clique total)
		"active:translate-y-(--shadow-button-size) active:shadow-[0_0px_0_0_rgba(0,0,0,0.2)]",

		// 4. Disabled (Fica afundado sem sombra)
		"disabled:translate-y-(--shadow-button-size) disabled:shadow-none",
	],
	variants: {
		variant: {
			primary: [
				"shadow-[0_var(--shadow-button-size)_0_0_var(--primary-shadow)]",
				"hover:not-active:shadow-[0_var(--hovered-shadow-button-size)_0_0_var(--primary-shadow)]",
				"dark:shadow-[0_var(--shadow-button-size)_0_0_var(--primary-shadow)]",
				"dark:hover:not-active:shadow-[0_var(--hovered-shadow-button-size)_0_0_var(--primary-shadow)]",
			],
			outline:
				"shadow-[0_var(--shadow-button-size)_0_0_hsl(var(--input))] hover:not-active:shadow-[0_var(--hovered-shadow-button-size)_0_0_hsl(var(--input))]",
			secondary: "",
			ghost:
				"shadow-none hover:not-active:translate-y-0 hover:not-active:shadow-none active:translate-y-0 active:shadow-none dark:shadow-none dark:hover:not-active:shadow-none hover:dark:shadow-none",
			destructive: [
				"shadow-[0_var(--shadow-button-size)_0_0_var(--destructive-shadow)]",
				"hover:not-active:shadow-[0_var(--hovered-shadow-button-size)_0_0_var(--destructive-shadow)]",
				"dark:shadow-[0_var(--shadow-button-size)_0_0_var(--destructive-shadow)]",
				"dark:hover:not-active:shadow-[0_var(--hovered-shadow-button-size)_0_0_var(--destructive-shadow)]",
			],
			link: "shadow-none hover:not-active:translate-y-0 hover:not-active:shadow-none active:translate-y-0 active:shadow-none dark:shadow-none dark:hover:not-active:shadow-none hover:dark:shadow-none",
		},
	},
});

const buttonVariants = tv({
	base: "group/button relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md font-bold uppercase tracking-wide outline-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 border-2",
	variants: {
		variant: {
			primary: "border-primary-foreground/20 bg-primary text-primary-foreground",
			outline: "border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
			secondary: "border-secondary-foreground/10 bg-secondary text-secondary-foreground",
			ghost: "border-transparent hover:border-input/50 hover:bg-accent hover:text-accent-foreground",
			destructive: "border-destructive-foreground/20 bg-destructive text-destructive-foreground",
			link: "border-none text-primary underline-offset-4 hover:underline",
		},
		size: {
			default: "h-12 px-6 py-3 text-base",
			sm: "h-9 px-3 text-xs",
			lg: "h-14 px-10 text-lg",
			icon: "size-10",
		},
	},
});

type ButtonVariants = VariantProps<typeof buttonVariants>;
type ShadowVariants = VariantProps<typeof shadowVariants>;

export interface ButtonProps extends BaseUiButtonProps, ButtonVariants, ShadowVariants {
	className?: string;
}

export function Button({ ref, className, children, type = "button", size = "default", variant = "primary", ...props }: ButtonProps) {
	return (
		<BaseUiButton
			className={cn(buttonVariants({ size, variant, className }), shadowVariants({ variant, className }))}
			data-variant={variant}
			data-size={size}
			type={type}
			ref={ref}
			{...props}
		>
			{children}
		</BaseUiButton>
	);
}
