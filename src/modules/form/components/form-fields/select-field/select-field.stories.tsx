import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppleIcon, BananaIcon, CherryIcon, GrapeIcon, LeafIcon } from "lucide-react";
import { expect, userEvent, within } from "storybook/test";
import type { SelectOption } from "@/modules/form/components/form-fields/select-field";
import { useAppForm } from "@/modules/form/lib/app-form";

/**
 * O componente SelectField é um campo de seleção (dropdown) integrado ao contexto do formulário (TanStack Form).
 *
 * **Características principais:**
 * - Gerencia valor via `useFieldContext<string | null>`
 * - Recebe lista de opções tipadas (`SelectOption<T>`)
 * - Suporte a ícones nas opções com `icon?: LucideIcon`
 * - Suporte a `placeholder` e `defaultValue`
 *
 * **Uso:**
 * ```tsx
 * <Form.AppField name="fruit">
 *   {(AppFields) => (
 *     <AppFields.SelectField
 *       options={options}
 *       placeholder="Selecione uma fruta"
 *     />)}
 * </Form.AppField>
 * ```
 */

const fruitOptions: SelectOption[] = [
	{ value: "apple", label: "Maçã", icon: AppleIcon },
	{ value: "banana", label: "Banana", icon: BananaIcon },
	{ value: "cherry", label: "Cereja", icon: CherryIcon },
	{ value: "grape", label: "Uva", icon: GrapeIcon },
	{ value: "mint", label: "Hortelã", icon: LeafIcon },
];

const simpleOptions: SelectOption[] = [
	{ value: "option1", label: "Opção 1" },
	{ value: "option2", label: "Opção 2" },
	{ value: "option3", label: "Opção 3" },
];

interface StoryArgs {
	options: SelectOption[];
	placeholder?: string;
	defaultValue?: string;
}

function SelectFieldWrapper({ options, placeholder, defaultValue }: StoryArgs) {
	const Form = useAppForm({
		defaultValues: { value: null as string | null },
	});

	return (
		<div className="w-72">
			<Form.AppField name="value">
				{(AppFields) => <AppFields.SelectField defaultValue={defaultValue} options={options} placeholder={placeholder} />}
			</Form.AppField>
		</div>
	);
}

const meta = {
	component: SelectFieldWrapper,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		placeholder: { control: "text" },
		defaultValue: { control: "text" },
	},
} satisfies Meta<typeof SelectFieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Select padrão com opções simples
 */
export const Default: Story = {
	args: {
		options: simpleOptions,
		placeholder: "Selecione uma opção",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole("combobox");

		await expect(trigger).toBeInTheDocument();
		await userEvent.click(trigger);

		// Aguarda o popup abrir
		await new Promise((resolve) => setTimeout(resolve, 200));
	},
};

/**
 * Select com opções que possuem ícones
 */
export const WithIcons: Story = {
	args: {
		options: fruitOptions,
		placeholder: "Selecione uma fruta",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole("combobox");

		await userEvent.click(trigger);
		await new Promise((resolve) => setTimeout(resolve, 200));
	},
};

/**
 * Select com valor padrão pré-selecionado
 */
export const WithDefaultValue: Story = {
	args: {
		options: simpleOptions,
		defaultValue: "option2",
		placeholder: "Selecione uma opção",
	},
};
