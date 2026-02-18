import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";
import { InputOTP } from "@/components/ui/input-otp";

/**
 * O componente InputOTP é usado para entrada de códigos OTP (One-Time Password).
 *
 * **Características principais:**
 * - Entrada de códigos numéricos ou alfanuméricos
 * - Slots individuais para cada caractere
 * - Suporte a agrupamento de caracteres
 * - Separadores visuais customizáveis
 * - Estados visuais: focus, disabled, error (aria-invalid)
 * - Animação de cursor piscante
 * - Suporte a dark mode
 * - Navegação entre slots com teclado
 *
 * **Uso:**
 * ```tsx
 * <InputOTP.Root maxLength={6}>
 *   <InputOTP.Group>
 *     <InputOTP.Slot index={0} />
 *     <InputOTP.Slot index={1} />
 *     <InputOTP.Slot index={2} />
 *   </InputOTP.Group>
 *   <InputOTP.Separator />
 *   <InputOTP.Group>
 *     <InputOTP.Slot index={3} />
 *     <InputOTP.Slot index={4} />
 *     <InputOTP.Slot index={5} />
 *   </InputOTP.Group>
 * </InputOTP.Root>
 * ```
 */
const meta = {
	component: InputOTP.Root,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs", "new"],
	args: {
		maxLength: 6,
		children: null,
	},
	argTypes: {
		maxLength: { control: "number" },
		disabled: { control: "boolean" },
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const inputs = canvas.getAllByRole("textbox");

		// Simula digitação de um código
		await userEvent.type(inputs[0], "123456");
	},
} satisfies Meta<typeof InputOTP.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * InputOTP padrão com 6 dígitos em dois grupos
 */
export const Default: Story = {
	args: {
		maxLength: 6,
		children: null,
	},
	render: () => (
		<InputOTP.Root maxLength={6}>
			<InputOTP.Group>
				<InputOTP.Slot index={0} />
				<InputOTP.Slot index={1} />
				<InputOTP.Slot index={2} />
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				<InputOTP.Slot index={3} />
				<InputOTP.Slot index={4} />
				<InputOTP.Slot index={5} />
			</InputOTP.Group>
		</InputOTP.Root>
	),
};

/**
 * InputOTP com 4 dígitos
 */
export const FourDigits: Story = {
	args: {
		maxLength: 4,
		children: null,
	},
	render: () => (
		<InputOTP.Root maxLength={4}>
			<InputOTP.Group>
				<InputOTP.Slot index={0} />
				<InputOTP.Slot index={1} />
				<InputOTP.Slot index={2} />
				<InputOTP.Slot index={3} />
			</InputOTP.Group>
		</InputOTP.Root>
	),
};

/**
 * InputOTP com 8 dígitos em três grupos
 */
export const EightDigits: Story = {
	args: {
		maxLength: 8,
		children: null,
	},
	render: () => (
		<InputOTP.Root maxLength={8}>
			<InputOTP.Group>
				<InputOTP.Slot index={0} />
				<InputOTP.Slot index={1} />
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				<InputOTP.Slot index={2} />
				<InputOTP.Slot index={3} />
				<InputOTP.Slot index={4} />
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				<InputOTP.Slot index={5} />
				<InputOTP.Slot index={6} />
				<InputOTP.Slot index={7} />
			</InputOTP.Group>
		</InputOTP.Root>
	),
};

/**
 * InputOTP desabilitado
 */
export const Disabled: Story = {
	args: {
		maxLength: 6,
		children: null,
	},
	render: () => (
		<InputOTP.Root maxLength={6} disabled>
			<InputOTP.Group>
				<InputOTP.Slot index={0} />
				<InputOTP.Slot index={1} />
				<InputOTP.Slot index={2} />
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				<InputOTP.Slot index={3} />
				<InputOTP.Slot index={4} />
				<InputOTP.Slot index={5} />
			</InputOTP.Group>
		</InputOTP.Root>
	),
};

/**
 * InputOTP com erro (aria-invalid)
 */
export const WithError: Story = {
	args: {
		maxLength: 6,
		children: null,
	},
	render: () => (
		<InputOTP.Root maxLength={6}>
			<InputOTP.Group>
				<InputOTP.Slot index={0} aria-invalid />
				<InputOTP.Slot index={1} aria-invalid />
				<InputOTP.Slot index={2} aria-invalid />
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				<InputOTP.Slot index={3} aria-invalid />
				<InputOTP.Slot index={4} aria-invalid />
				<InputOTP.Slot index={5} aria-invalid />
			</InputOTP.Group>
		</InputOTP.Root>
	),
};

/**
 * InputOTP customizado sem separadores
 */
export const NoSeparator: Story = {
	args: {
		maxLength: 6,
		children: null,
	},
	render: () => (
		<InputOTP.Root maxLength={6}>
			<InputOTP.Group>
				<InputOTP.Slot index={0} />
				<InputOTP.Slot index={1} />
				<InputOTP.Slot index={2} />
				<InputOTP.Slot index={3} />
				<InputOTP.Slot index={4} />
				<InputOTP.Slot index={5} />
			</InputOTP.Group>
		</InputOTP.Root>
	),
};
