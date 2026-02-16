import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppleIcon, BananaIcon, CherryIcon, GrapeIcon } from "lucide-react";
import { userEvent, within } from "storybook/test";
import { Select } from "@/components/ui/select";

/**
 * O componente Select é um dropdown de seleção estilizado baseado no @base-ui/react.
 *
 * **Características principais:**
 * - Seleção única de opções
 * - Suporte a agrupamento de itens
 * - Ícones e labels customizáveis
 * - Scroll automático com botões de navegação
 * - Estados visuais: focus, disabled, error (aria-invalid)
 * - Suporte a dark mode
 * - Posicionamento inteligente (top, bottom, left, right)
 * - Separadores entre itens
 * - Indicador visual de item selecionado
 * - Tamanhos variáveis (sm, default)
 *
 * **Uso:**
 * ```tsx
 * <Select.Root>
 *   <Select.Trigger>
 *     <Select.Value placeholder="Selecione..." />
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Item value="option1">Opção 1</Select.Item>
 *     <Select.Item value="option2">Opção 2</Select.Item>
 *   </Select.Content>
 * </Select.Root>
 * ```
 */
const meta = {
	component: Select.Root,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs", "new"],
	argTypes: {
		disabled: { control: "boolean" },
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole("combobox");

		await userEvent.click(trigger);

		// Espera o popup abrir
		await new Promise((resolve) => setTimeout(resolve, 200));
	},
} satisfies Meta<typeof Select.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Select padrão com opções simples
 */
export const Default: Story = {
	render: (args) => (
		<Select.Root {...args}>
			<Select.Trigger>
				<Select.Value placeholder="Selecione uma fruta" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="apple">Maçã</Select.Item>
				<Select.Item value="banana">Banana</Select.Item>
				<Select.Item value="orange">Laranja</Select.Item>
				<Select.Item value="grape">Uva</Select.Item>
				<Select.Item value="cherry">Cereja</Select.Item>
			</Select.Content>
		</Select.Root>
	),
};

/**
 * Select com ícones nas opções
 */
export const WithIcons: Story = {
	render: (args) => (
		<Select.Root {...args}>
			<Select.Trigger>
				<Select.Value placeholder="Selecione uma fruta" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="apple">
					<AppleIcon />
					<span>Maçã</span>
				</Select.Item>
				<Select.Item value="banana">
					<BananaIcon />
					<span>Banana</span>
				</Select.Item>
				<Select.Item value="grape">
					<GrapeIcon />
					<span>Uva</span>
				</Select.Item>
				<Select.Item value="cherry">
					<CherryIcon />
					<span>Cereja</span>
				</Select.Item>
			</Select.Content>
		</Select.Root>
	),
};

/**
 * Select com grupos de opções
 */
export const WithGroups: Story = {
	render: (args) => (
		<Select.Root {...args}>
			<Select.Trigger>
				<Select.Value placeholder="Selecione um item" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Frutas</Select.Label>
					<Select.Item value="apple">Maçã</Select.Item>
					<Select.Item value="banana">Banana</Select.Item>
					<Select.Item value="orange">Laranja</Select.Item>
				</Select.Group>
				<Select.Separator />
				<Select.Group>
					<Select.Label>Vegetais</Select.Label>
					<Select.Item value="carrot">Cenoura</Select.Item>
					<Select.Item value="tomato">Tomate</Select.Item>
					<Select.Item value="lettuce">Alface</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	),
};

/**
 * Select pequeno (size="sm")
 */
export const Small: Story = {
	render: (args) => (
		<Select.Root {...args}>
			<Select.Trigger size="sm">
				<Select.Value placeholder="Select pequeno" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="1">Opção 1</Select.Item>
				<Select.Item value="2">Opção 2</Select.Item>
				<Select.Item value="3">Opção 3</Select.Item>
			</Select.Content>
		</Select.Root>
	),
};

/**
 * Select desabilitado
 */
export const Disabled: Story = {
	args: {
		disabled: true,
	},
	render: (args) => (
		<Select.Root {...args}>
			<Select.Trigger>
				<Select.Value placeholder="Select desabilitado" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="1">Opção 1</Select.Item>
				<Select.Item value="2">Opção 2</Select.Item>
			</Select.Content>
		</Select.Root>
	),
};

/**
 * Select com item desabilitado
 */
export const WithDisabledItem: Story = {
	render: (args) => (
		<Select.Root {...args}>
			<Select.Trigger>
				<Select.Value placeholder="Selecione uma opção" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="1">Opção disponível 1</Select.Item>
				<Select.Item value="2" disabled>
					Opção desabilitada
				</Select.Item>
				<Select.Item value="3">Opção disponível 2</Select.Item>
			</Select.Content>
		</Select.Root>
	),
};

/**
 * Select com valor padrão
 */
export const WithDefaultValue: Story = {
	args: {
		defaultValue: "banana",
	},
	render: (args) => (
		<Select.Root {...args}>
			<Select.Trigger>
				<Select.Value placeholder="Selecione uma fruta" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="apple">Maçã</Select.Item>
				<Select.Item value="banana">Banana</Select.Item>
				<Select.Item value="orange">Laranja</Select.Item>
			</Select.Content>
		</Select.Root>
	),
};

/**
 * Select com muitas opções (scroll)
 */
export const WithManyOptions: Story = {
	render: (args) => (
		<Select.Root {...args}>
			<Select.Trigger>
				<Select.Value placeholder="Selecione um número" />
			</Select.Trigger>
			<Select.Content>
				{Array.from({ length: 20 }, (_, i) => (
					<Select.Item key={`option-${i + 1}`} value={`${i + 1}`}>
						Opção {i + 1}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	),
};
