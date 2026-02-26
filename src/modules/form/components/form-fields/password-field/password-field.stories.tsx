import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentPropsWithRef } from "react";
import { expect, userEvent, within } from "storybook/test";
import { useAppForm } from "@/modules/form/lib/app-form";

/**
 * O componente PasswordField é um campo de senha integrado ao contexto do formulário (TanStack Form).
 *
 * **Características principais:**
 * - Gerencia valor via contexto de campo (`useFieldContext`)
 * - Botão para alternar visibilidade da senha (texto ↔ senha)
 * - Ícones EyeIcon / EyeClosedIcon para indicar o estado
 * - `autoComplete="current-password"` por padrão
 *
 * **Uso:**
 * ```tsx
 * <Form.AppField name="password">
 *   {(AppFields) => <AppFields.PasswordField placeholder="Sua senha" />}
 * </Form.AppField>
 * ```
 */

function PasswordFieldWrapper({ ...props }: ComponentPropsWithRef<"input">) {
	const Form = useAppForm({
		defaultValues: { value: "" },
	});

	return (
		<div className="w-72">
			<Form.AppField name="value">{(AppFields) => <AppFields.PasswordField {...props} />}</Form.AppField>
		</div>
	);
}

const meta = {
	component: PasswordFieldWrapper,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		placeholder: { control: "text" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof PasswordFieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Campo de senha padrão (valor oculto)
 */
export const Default: Story = {
	args: {
		placeholder: "******",
		title: "password-field-story",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTitle("password-field-story") as HTMLInputElement;

		await userEvent.type(input, "minhasenha123");
		await expect(input).toHaveValue("minhasenha123");
		await expect(input.type).toBe("password");
	},
};

/**
 * Toggle de visibilidade: senha visível ao clicar no botão
 */
export const ToggleVisibility: Story = {
	args: {
		placeholder: "******",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const toggleButton = canvas.getByRole("button");
		const input = canvasElement.querySelector("input") as HTMLInputElement;

		await expect(input.type).toBe("password");

		await userEvent.click(toggleButton);
		await expect(input.type).toBe("text");

		await userEvent.click(toggleButton);
		await expect(input.type).toBe("password");
	},
};

/**
 * Campo desabilitado
 */
export const Disabled: Story = {
	args: {
		disabled: true,
	},
	play: async ({ canvasElement }) => {
		const input = canvasElement.querySelector("input") as HTMLInputElement;

		await expect(input).toBeDisabled();
	},
};
