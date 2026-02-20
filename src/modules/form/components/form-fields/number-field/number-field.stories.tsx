import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useAppForm } from "@/modules/form/lib/app-form";

/**
 * O componente NumberField é um campo numérico integrado ao contexto do formulário (TanStack Form).
 *
 * **Características principais:**
 * - Gerencia valor numérico via `useFieldContext<number | null>`
 * - Suporte a valor mínimo (`min`, padrão: 0)
 * - Incremento/decremento via scroll (wheel) e teclas ArrowUp/ArrowDown
 * - Valor inválido (NaN) é tratado como 0
 *
 * **Uso:**
 * ```tsx
 * <Form.AppField name="quantity">
 *   {(AppFields) => <AppFields.NumberField min={1} placeholder="Quantidade" />}
 * </Form.AppField>
 * ```
 */

interface StoryArgs {
	placeholder?: string;
	min?: number;
	max?: number;
	disabled?: boolean;
}

function NumberFieldWrapper({ placeholder, min, max, disabled }: StoryArgs) {
	const Form = useAppForm({
		defaultValues: { value: null as number | null },
	});

	return (
		<div className="w-72">
			<Form.AppField name="value">
				{(AppFields) => <AppFields.NumberField disabled={disabled} max={max} min={min} placeholder={placeholder} />}
			</Form.AppField>
		</div>
	);
}

const meta = {
	component: NumberFieldWrapper,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		placeholder: { control: "text" },
		min: { control: "number" },
		max: { control: "number" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof NumberFieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Campo numérico padrão
 */
export const Default: Story = {
	args: {
		placeholder: "0",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.clear(input);
		await userEvent.type(input, "42");
		await expect(input).toHaveValue("42");
	},
};

/**
 * Campo com valor mínimo definido
 */
export const WithMinValue: Story = {
	args: {
		min: 5,
		placeholder: "Mínimo: 5",
	},
};

/**
 * Incremento via tecla ArrowUp
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
