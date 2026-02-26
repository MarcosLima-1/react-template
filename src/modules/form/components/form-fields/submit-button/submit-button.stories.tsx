import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { z } from "zod/v4";
import { Field } from "@/modules/form/components/field";
import { useAppForm } from "@/modules/form/lib/app-form";

/**
 * O componente SubmitButton é um botão de envio integrado ao contexto do formulário (TanStack Form).
 *
 * **Características principais:**
 * - Desabilitado automaticamente quando o formulário está inválido (`!isValid`)
 * - Desabilitado quando não pode ser submetido (`!canSubmit`)
 * - Desabilitado durante o envio (`isSubmitting`)
 * - Opção `disableOnDefaultValue`: desabilita quando o formulário está com valores padrão
 *
 * **Uso:**
 * ```tsx
 * <Form.AppForm>
 *   <Form.SubmitButton>Salvar</Form.SubmitButton>
 * </Form.AppForm>
 * ```
 */

const schema = z.object({
	name: z.string().min(3, "Mínimo 3 caracteres"),
});

interface StoryArgs {
	disableOnDefaultValue?: boolean;
	children?: string;
}

function SubmitButtonWrapper({ disableOnDefaultValue, children = "Enviar" }: StoryArgs) {
	const Form = useAppForm({
		defaultValues: { name: "" },
		validators: {
			onChange: schema,
			onMount: schema,
		},
		onSubmit: async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
		},
	});

	return (
		<form
			className="w-72 space-y-4"
			onSubmit={(e) => {
				e.preventDefault();
				Form.handleSubmit();
			}}
		>
			<Form.AppField name="name">
				{(AppFields) => (
					<Field.Wrapper>
						<Field.Label>Nome</Field.Label>
						<AppFields.TextField placeholder="Digite seu nome..." />
						<Field.Error />
					</Field.Wrapper>
				)}
			</Form.AppField>
			<Form.AppForm>
				<Form.SubmitButton className="w-full" disableOnDefaultValue={disableOnDefaultValue}>
					{children}
				</Form.SubmitButton>
			</Form.AppForm>
		</form>
	);
}

const meta = {
	component: SubmitButtonWrapper,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		disableOnDefaultValue: { control: "boolean" },
		children: { control: "text" },
	},
} satisfies Meta<typeof SubmitButtonWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Botão de submit desabilitado enquanto o formulário é inválido
 */
export const DisabledWhenInvalid: Story = {
	args: {
		children: "Enviar",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button", { name: "Enviar" });

		// Formulário inválido inicialmente — botão deve estar desabilitado
		await expect(button).toBeDisabled();
	},
};

/**
 * Botão de submit habilitado após preencher o formulário com dados válidos
 */
export const EnabledWhenValid: Story = {
	args: {
		children: "Salvar",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");
		const button = canvas.getByRole("button", { name: "Salvar" });

		await expect(button).toBeDisabled();

		// Preenche com valor válido (mínimo 3 caracteres)
		await userEvent.type(input, "João");

		await expect(button).not.toBeDisabled();
	},
};

/**
 * Botão desabilitado quando o formulário está com valores padrão (disableOnDefaultValue)
 */
export const DisabledOnDefaultValue: Story = {
	args: {
		disableOnDefaultValue: true,
		children: "Confirmar",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button", { name: "Confirmar" });

		await expect(button).toBeDisabled();
	},
};
