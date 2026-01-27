import {
	Accordion as AccordionBaseUi,
	type AccordionItemProps,
	type AccordionPanelProps,
	type AccordionRootProps,
	type AccordionTriggerProps,
} from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "tailwind-variants";

function AccordionRoot({ ...props }: AccordionRootProps) {
	return <AccordionBaseUi.Root {...props} />;
}

function AccordionItem({ className, ...props }: AccordionItemProps) {
	return <AccordionBaseUi.Item className={cn("border-b transition-all last:border-b-0", className)} {...props} />;
}

function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
	return (
		<AccordionBaseUi.Header className="flex">
			<AccordionBaseUi.Trigger
				className={cn(
					"flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-panel-open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
			</AccordionBaseUi.Trigger>
		</AccordionBaseUi.Header>
	);
}

function AccordionContent({ className, children, ...props }: AccordionPanelProps) {
	return (
		<AccordionBaseUi.Panel className="overflow-hidden text-sm" {...props}>
			<div className={cn("pt-0 pb-4", className)}>{children}</div>
		</AccordionBaseUi.Panel>
	);
}

export const Accordion = {
	Root: AccordionRoot,
	Item: AccordionItem,
	Trigger: AccordionTrigger,
	Content: AccordionContent,
};
