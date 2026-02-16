import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Textarea } from "@/components/ui/textarea";

/**
 * O componente Textarea é um campo de entrada de texto multilinha estilizado.
 *
 * **Características principais:**
 * - Suporta todos os atributos nativos de textarea HTML
 * - Ajuste automático de altura (field-sizing-content)
 * - Estilização responsiva (mobile e desktop)
 * - Estados visuais: focus, disabled, error (aria-invalid)
 * - Suporte a dark mode
 * - Placeholders estilizados
 * - Transições suaves entre estados
 * - Altura mínima configurável
 *
 * **Uso:**
 * ```tsx
 * <Textarea placeholder="Digite sua mensagem..." />
 * <Textarea rows={5} placeholder="Texto longo..." />
 * <Textarea aria-invalid={true} placeholder="Valor inválido" />
 * ```
 */
const meta = {
	component: Textarea,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs", "new"],
	argTypes: {
		rows: { control: "number" },
		disabled: { control: "boolean" },
		placeholder: { control: "text" },
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const textarea = canvas.getByRole("textbox");

		await userEvent.type(textarea, "Texto de teste\nCom múltiplas linhas");

		if (args.onChange) {
			await expect(args.onChange).toHaveBeenCalled();
		}
	},
	args: { onChange: fn() },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Textarea padrão
 */
export const Default: Story = {
	args: {
		placeholder: "Digite sua mensagem...",
	},
};

/**
 * Textarea com valor preenchido
 */
export const WithValue: Story = {
	args: {
		defaultValue: "Este é um texto de exemplo\nCom múltiplas linhas\nPara demonstrar o componente",
		placeholder: "Digite sua mensagem...",
	},
};

/**
 * Textarea no estado desabilitado
 */
export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: "Campo desabilitado",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const textarea = canvas.getByRole("textbox");

		await expect(textarea).toBeDisabled();
	},
};

/**
 * Textarea com erro (aria-invalid)
 */
export const WithError: Story = {
	args: {
		"aria-invalid": true,
		defaultValue: "Valor inválido",
		placeholder: "Digite um valor válido",
	},
};

/**
 * Textarea com número de linhas especificado
 */
export const WithRows: Story = {
	args: {
		rows: 8,
		placeholder: "Textarea com 8 linhas...",
	},
};

/**
 * Textarea com tamanho customizado
 */
export const CustomSize: Story = {
	args: {
		placeholder: "Textarea com largura customizada",
		className: "w-96",
	},
};

/**
 * Textarea para mensagens longas
 */
export const LongMessage: Story = {
	args: {
		rows: 10,
		placeholder: "Digite uma mensagem longa aqui...",
		className: "w-[32rem]",
	},
};

/**
 * Textarea com limite de caracteres (exemplo de uso)
 */
export const WithCharacterLimit: Story = {
	args: {
		maxLength: 200,
		placeholder: "Máximo de 200 caracteres...",
		defaultValue: "Este textarea tem um limite de caracteres definido.",
	},
};
