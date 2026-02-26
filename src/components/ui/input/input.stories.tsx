import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Input } from "@/components/ui/input";

/**
 * O componente Input é um campo de entrada de texto estilizado baseado no @base-ui/react.
 *
 * **Características principais:**
 * - Suporta todos os atributos nativos de input HTML
 * - Estilização responsiva (mobile e desktop)
 * - Estados visuais: focus, disabled, error (aria-invalid)
 * - Suporte a dark mode
 * - Upload de arquivos com estilização customizada
 * - Placeholders estilizados
 * - Transições suaves entre estados
 *
 * **Uso:**
 * ```tsx
 * <Input placeholder="Digite algo..." />
 * <Input type="email" placeholder="seu@email.com" />
 * <Input aria-invalid={true} placeholder="Valor inválido" />
 * ```
 */
const meta = {
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs", "new"],
	argTypes: {
		type: {
			control: "select",
			options: ["text", "email", "password", "number", "tel", "url", "search", "date", "file"],
		},
		disabled: { control: "boolean" },
		placeholder: { control: "text" },
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTitle("input-story");

		await userEvent.clear(input);
		await userEvent.type(input, "test");

		if (args.onChange) {
			await expect(args.onChange).toHaveBeenCalled();
			await expect(input).toHaveValue("test");
		}
	},
	args: { onChange: fn(), title: "input-story" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Input padrão com texto simples
 */
export const Default: Story = {
	args: {
		placeholder: "Digite algo...",
	},
};

/**
 * Input com valor preenchido
 */
export const WithValue: Story = {
	args: {
		defaultValue: "Valor inicial",
		placeholder: "Digite algo...",
	},
};

/**
 * Input no estado desabilitado
 */
export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: "Campo desabilitado",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTitle("input-story");

		await expect(input).toBeDisabled();
	},
};

/**
 * Input com erro (aria-invalid)
 */
export const WithError: Story = {
	args: {
		"aria-invalid": true,
		defaultValue: "Valor inválido",
		placeholder: "Digite um valor válido",
	},
};

/**
 * Input do tipo email
 */
export const Email: Story = {
	args: {
		type: "email",
		placeholder: "seu@email.com",
	},
};

/**
 * Input do tipo password
 */
export const Password: Story = {
	args: {
		type: "password",
		placeholder: "Digite sua senha",
	},
};

/**
 * Input do tipo number
 */
export const NumberInput: Story = {
	args: {
		type: "number",
		placeholder: "0",
		min: 0,
		max: 100,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTitle("input-story") as HTMLInputElement;

		await userEvent.type(input, "100");
		await expect(input).toHaveValue(100);
	},
};

/**
 * Input do tipo search
 */
export const Search: Story = {
	args: {
		type: "search",
		placeholder: "Buscar...",
	},
};

/**
 * Input do tipo tel
 */
export const Phone: Story = {
	args: {
		type: "tel",
		placeholder: "(00) 00000-0000",
	},
};

/**
 * Input do tipo date
 */
export const DateInput: Story = {
	args: {
		type: "date",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTitle("input-story") as HTMLInputElement;

		input.value = "2026-02-15";
		await expect(input.value).toBe("2026-02-15");
	},
};

/**
 * Input com tamanho customizado
 */
export const CustomWidth: Story = {
	args: {
		placeholder: "Input com largura customizada",
		className: "w-96",
	},
};
