import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "@/components/ui/button/button";
import { Dialog } from "@/components/ui/dialog";

const meta = {
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog.presets.basic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const basic: Story = {
	render: () => {
		return (
			<Dialog.provider>
				<Dialog.trigger asChild>
					<Button>Open Dialog</Button>
				</Dialog.trigger>
				<Dialog.presets.basic>
					<Dialog.header>
						<Dialog.title>Dialog Title</Dialog.title>
						<Dialog.description>Dialog Description</Dialog.description>
					</Dialog.header>
					<p>Dialog Body</p>
					<Dialog.footer>
						<Dialog.close>Close</Dialog.close>
					</Dialog.footer>
				</Dialog.presets.basic>
			</Dialog.provider>
		);
	},
};

export const confirm: Story = {
	render: () => {
		return (
			<Dialog.provider>
				<Dialog.trigger asChild>
					<Button>Open Dialog</Button>
				</Dialog.trigger>
				<Dialog.presets.confirm title="Dialog Title" description="Dialog Description" onClickConfirm={fn} onClickCancel={fn}>
					<p>Dialog Body</p>
				</Dialog.presets.confirm>
			</Dialog.provider>
		);
	},
};

export const CustomComposition: Story = {
	render: () => {
		return (
			<Dialog.provider>
				<Dialog.trigger asChild>
					<Button>Open Dialog</Button>
				</Dialog.trigger>
				<Dialog.portal>
					<Dialog.overlay />
					<Dialog.content>
						<Dialog.header>
							<Dialog.title>Dialog Title</Dialog.title>
							<Dialog.description>Dialog Description</Dialog.description>
						</Dialog.header>
						<p>Dialog Body</p>
						<Dialog.footer>
							<Dialog.close>Close</Dialog.close>
						</Dialog.footer>
					</Dialog.content>
				</Dialog.portal>
			</Dialog.provider>
		);
	},
};
