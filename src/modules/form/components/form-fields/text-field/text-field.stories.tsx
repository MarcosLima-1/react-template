import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useAppForm } from "@/modules/form/lib/app-form";

/**
 * O componente TextField é um campo de texto integrado ao contexto do formulário (TanStack Form).
 *
 * **Características principais:**
 * - Gerencia valor via contexto de campo (`useFieldContext`)
 * - Suporte a `maxLength` com contador de caracteres
 * - Contador de caracteres pode ser desabilitado com `disableCharCounter`
 * - Suporte a todos os atributos nativos de `<input>`
 *
 * **Uso:**
 * ```tsx
 * <Form.AppField name="username">
 *   {(AppFields) => <AppFields.TextField placeholder="Nome de usuário" maxLength={50} />}
 * </Form.AppField>
 * ```
 */

interface StoryArgs {
	placeholder?: string;
	maxLength?: number;
	disableCharCounter?: boolean;
	disabled?: boolean;
}

function TextFieldWrapper({ placeholder, maxLength, disableCharCounter, disabled }: StoryArgs) {
	const Form = useAppForm({
		defaultValues: { value: "" },
	});

	return (
		<div className="w-72">
			<Form.AppField name="value">
				{(AppFields) => (
					<AppFields.TextField
						disabled={disabled}
						disableCharCounter={disableCharCounter}
						maxLength={maxLength}
						placeholder={placeholder}
					/>
				)}
			</Form.AppField>
		</div>
	);
}

const meta = {
	component: TextFieldWrapper,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		placeholder: { control: "text" },
		maxLength: { control: "number" },
		disableCharCounter: { control: "boolean" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof TextFieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Campo de texto padrão sem restrições
 */
export const Default: Story = {
	args: {
		placeholder: "Digite algo...",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.type(input, "Texto de teste");
		await expect(input).toHaveValue("Texto de teste");
	},
};

/**
 * Campo com contador de caracteres ativo
 */
export const WithCharCounter: Story = {
	args: {
		maxLength: 50,
		placeholder: "Máximo 50 caracteres...",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.type(input, "Olá");
		await expect(input).toHaveValue("Olá");
		await expect(canvas.getByText("3/50")).toBeInTheDocument();
	},
};

/**
 * Campo com maxLength mas sem contador de caracteres
 */
export const WithoutCharCounter: Story = {
	args: {
		maxLength: 50,
		disableCharCounter: true,
		placeholder: "Sem contador de caracteres",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.type(input, "Texto");
		await expect(input).toHaveValue("Texto");
		await expect(canvas.queryByText(/\d+\/50/)).not.toBeInTheDocument();
	},
};

/**
 * Campo no estado desabilitado
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
