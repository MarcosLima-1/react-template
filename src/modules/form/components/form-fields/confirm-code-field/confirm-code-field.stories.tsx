import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useAppForm } from "@/modules/form/lib/app-form";

/**
 * O componente ConfirmCodeField é um campo de entrada de código numérico de 6 dígitos integrado ao contexto do formulário (TanStack Form).
 *
 * **Características principais:**
 * - Gerencia valor via `useFieldContext<string>`
 * - Aceita apenas dígitos (filtro no onChange)
 * - Limite de 6 caracteres (maxLength={6})
 * - `inputMode="numeric"` para melhor experiência mobile
 *
 * **Uso:**
 * ```tsx
 * <Form.AppField name="code">
 *   {(AppFields) => <AppFields.ConfirmCodeField />}
 * </Form.AppField>
 * ```
 */

function ConfirmCodeFieldWrapper() {
	const Form = useAppForm({
		defaultValues: { value: "" },
	});

	return <Form.AppField name="value">{(AppFields) => <AppFields.ConfirmCodeField />}</Form.AppField>;
}

const meta = {
	component: ConfirmCodeFieldWrapper,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ConfirmCodeFieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Campo de código padrão com limite de 6 dígitos
 */
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await expect(input).toBeInTheDocument();
		await expect(input).toHaveAttribute("maxLength", "6");
	},
};

/**
 * Digitando um código de 6 dígitos
 */
export const FillingCode: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.click(input);
		await userEvent.keyboard("123456");

		// Verifica que o input foi preenchido
		await expect(input).toHaveValue("123456");
	},
};

/**
 * Tentativa de inserir letras (deve ser ignorado — apenas dígitos são permitidos)
 */
export const OnlyDigitsAllowed: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.click(input);
		// Dígitos devem ser aceitos
		await userEvent.keyboard("1");
		// Letras devem ser ignoradas pelo filtro de regex no onChange
		await userEvent.keyboard("a");

		// Verifica que apenas o dígito foi inserido no input
		await expect(input).toHaveValue("1");
	},
};

/**
 * Tentativa de inserir mais de 6 caracteres (deve respeitar o limite)
 */
export const MaxLengthRespected: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.click(input);
		await userEvent.keyboard("12345678");

		// Verifica que apenas os 6 primeiros dígitos foram mantidos
		await expect(input).toHaveValue("123456");
	},
};
