import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useAppForm } from "@/modules/form/lib/app-form";

/**
 * O componente TextareaField é um campo de área de texto integrado ao contexto do formulário (TanStack Form).
 *
 * **Características principais:**
 * - Gerencia valor via `useFieldContext<string>`
 * - Altura fixa de 200px com `resize` desabilitado
 * - Suporte a `maxLength` com contador de caracteres
 * - Contador pode ser desabilitado com `disableCharCounter`
 *
 * **Uso:**
 * ```tsx
 * <Form.AppField name="description">
 *   {(AppFields) => <AppFields.TextareaField placeholder="Descreva..." maxLength={500} />}
 * </Form.AppField>
 * ```
 */

interface StoryArgs {
	placeholder?: string;
	maxLength?: number;
	disableCharCounter?: boolean;
	disabled?: boolean;
}

function TextareaFieldWrapper({ placeholder, maxLength, disableCharCounter, disabled }: StoryArgs) {
	const Form = useAppForm({
		defaultValues: { value: "" },
	});

	return (
		<div className="w-72">
			<Form.AppField name="value">
				{(AppFields) => (
					<AppFields.TextareaField
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
	component: TextareaFieldWrapper,
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
} satisfies Meta<typeof TextareaFieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Textarea padrão sem restrições
 */
export const Default: Story = {
	args: {
		placeholder: "Digite sua mensagem...",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const textarea = canvas.getByRole("textbox");

		await userEvent.type(textarea, "Mensagem de teste");
		await expect(textarea).toHaveValue("Mensagem de teste");
	},
};

/**
 * Textarea com contador de caracteres
 */
export const WithCharCounter: Story = {
	args: {
		maxLength: 200,
		placeholder: "Máximo 200 caracteres...",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const textarea = canvas.getByRole("textbox");

		await userEvent.type(textarea, "Olá!");
		await expect(textarea).toHaveValue("Olá!");
		await expect(canvas.getByText("4/200")).toBeInTheDocument();
	},
};

/**
 * Textarea com maxLength mas sem contador de caracteres
 */
export const WithoutCharCounter: Story = {
	args: {
		maxLength: 200,
		disableCharCounter: true,
		placeholder: "Sem contador de caracteres",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const textarea = canvas.getByRole("textbox");

		await userEvent.type(textarea, "Texto");
		await expect(textarea).toHaveValue("Texto");
		await expect(canvas.queryByText(/\d+\/200/)).not.toBeInTheDocument();
	},
};

/**
 * Textarea desabilitado
 */
export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: "Campo desabilitado",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const textarea = canvas.getByRole("textbox");

		await expect(textarea).toBeDisabled();
	},
};
