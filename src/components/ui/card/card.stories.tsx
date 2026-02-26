import type { Meta, StoryObj } from "@storybook/react-vite";
import { BellIcon } from "lucide-react";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const meta = {
	component: Card.Root,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Card.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {
	render: () => {
		const inputId = useId();

		return (
			<Card.Root className="w-87">
				<Card.Header>
					<Card.Title>Create project</Card.Title>
					<Card.Description>Deploy your new project in one-click.</Card.Description>
				</Card.Header>
				<Card.Content>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<label htmlFor={inputId} className="font-medium text-sm">
								Name
							</label>
							<Input id={inputId} placeholder="Name of your project" />
						</div>
					</div>
				</Card.Content>
				<Card.Footer className="flex justify-between">
					<Button variant="outline">Cancel</Button>
					<Button>Deploy</Button>
				</Card.Footer>
			</Card.Root>
		);
	},
};

export const Simple: Story = {
	render: () => (
		<Card.Root className="w-87">
			<Card.Header>
				<Card.Title className="flex items-center gap-2">
					<BellIcon size={16} />
					Notification
				</Card.Title>
				<Card.Description>You have a new message.</Card.Description>
			</Card.Header>
			<Card.Content>
				<p className="text-sm">Your team has just requested to join the project.</p>
			</Card.Content>
		</Card.Root>
	),
};
