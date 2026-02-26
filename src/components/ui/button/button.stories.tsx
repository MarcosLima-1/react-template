import type { Meta, StoryObj } from "@storybook/react-vite";
import { TrashIcon } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "@/components/ui/button";

const meta = {
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs", "new"],
	argTypes: {
		variant: { control: "select" },
		size: { control: "select" },
		type: { control: "select", options: ["button", "submit", "reset"] },
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");

		await userEvent.click(button);

		await expect(args.onClick).toHaveBeenCalled();
	},
	args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Button",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Button",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Button",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Button",
	},
};

export const Link: Story = {
	args: {
		variant: "link",
		children: "Button",
	},
};

export const Secondary: Story = {
	args: {
		children: "Button",
		variant: "secondary",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		children: "Button",
	},
};

export const Icon: Story = {
	args: {
		size: "icon",
		variant: "destructive",
	},
	render: (args) => (
		<Button {...args}>
			<TrashIcon />
			<span className="sr-only">Apagar</span>
		</Button>
	),
};

export const Large: Story = {
	args: {
		size: "lg",
		children: "Button",
	},
};
