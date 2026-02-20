import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useAppForm } from "@/modules/form/lib/app-form";

/**
 * O componente CentsField é um campo de valor monetário (em centavos) integrado ao contexto do formulário (TanStack Form).
 *
 * **Características principais:**
 * - Gerencia valor numérico inteiro (centavos) via `useFieldContext<number | null>`
 * - Valor mínimo configurável (`min`, padrão: 0)
 * - Incremento/decremento via scroll (wheel) e teclas ArrowUp/ArrowDown
 * - Exibe o valor formatado em reais ao lado do input
 *
 * **Uso:**
 * ```tsx
 * <Form.AppField name="price">
 *   {(AppFields) => <AppFields.CentsField min={0} placeholder="Valor em centavos" />}
 * </Form.AppField>
 * ```
 */

interface StoryArgs {
	placeholder?: string;
	min?: number;
	disabled?: boolean;
}

function CentsFieldWrapper({ placeholder, min, disabled }: StoryArgs) {
	const Form = useAppForm({
		defaultValues: { value: null as number | null },
	});

	return (
		<div className="w-72">
			<Form.AppField name="value">
				{(AppFields) => <AppFields.CentsField disabled={disabled} min={min} placeholder={placeholder} />}
			</Form.AppField>
		</div>
	);
}

const meta = {
	component: CentsFieldWrapper,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		placeholder: { control: "text" },
		min: { control: "number" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof CentsFieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Campo de centavos padrão
 */
export const Default: Story = {
	args: {
		placeholder: "0",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.clear(input);
		await userEvent.type(input, "1000");
		await expect(input).toHaveValue("1000");
	},
};

/**
 * Campo com valor mínimo definido
 */
export const WithMinValue: Story = {
	args: {
		min: 100,
		placeholder: "Mínimo: R$ 1,00 (100 centavos)",
	},
};

/**
 * Incremento via teclado ArrowUp/ArrowDown
 */
export const KeyboardIncrement: Story = {
	args: {
		min: 0,
		placeholder: "Use ArrowUp/ArrowDown",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.click(input);
		await userEvent.keyboard("{ArrowUp}");
		await expect(input).toHaveValue("1");

		await userEvent.keyboard("{ArrowUp}");
		await expect(input).toHaveValue("2");

		await userEvent.keyboard("{ArrowDown}");
		await expect(input).toHaveValue("1");
	},
};

/**
 * Campo desabilitado
 */
export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: "Campo desabilitado",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await expect(input).toBeDisabled();
	},
};
