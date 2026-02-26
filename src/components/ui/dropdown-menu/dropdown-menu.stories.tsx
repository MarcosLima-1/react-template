import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	CopyIcon,
	LogOutIcon,
	MailIcon,
	MessageSquareIcon,
	MoreHorizontalIcon,
	PlusCircleIcon,
	SettingsIcon,
	UserIcon,
	UserPlusIcon,
} from "lucide-react";
import { useState } from "react";
import { userEvent, within } from "storybook/test";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

/**
 * O componente DropdownMenu exibe um menu contextual suspenso com opções e ações.
 *
 * **Características principais:**
 * - Menu suspenso contextual com várias opções
 * - Suporta itens simples, checkbox e radio
 * - Submenus aninhados
 * - Separadores entre grupos de itens
 * - Labels para grupos de opções
 * - Atalhos de teclado visíveis
 * - Variantes: default e destructive
 * - Suporte a inset (indentação) para alinhamento
 * - Ícones customizáveis
 * - Animações de entrada/saída
 * - Posicionamento inteligente (top, bottom, left, right)
 * - Estados visuais: hover, focus, disabled
 * - Suporte a dark mode
 * - Portal para renderização fora da hierarquia DOM
 *
 * **Uso:**
 * ```tsx
 * <DropdownMenu.Root>
 *   <DropdownMenu.Trigger asChild>
 *     <Button>Menu</Button>
 *   </DropdownMenu.Trigger>
 *   <DropdownMenu.Content>
 *     <DropdownMenu.Item>Item 1</DropdownMenu.Item>
 *     <DropdownMenu.Item>Item 2</DropdownMenu.Item>
 *   </DropdownMenu.Content>
 * </DropdownMenu.Root>
 * ```
 */
const meta = {
	component: DropdownMenu.Root,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs", "new"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole("button");

		await userEvent.click(trigger);
		await new Promise((resolve) => setTimeout(resolve, 200));
	},
} satisfies Meta<typeof DropdownMenu.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * DropdownMenu básico com itens simples
 */
export const Default: Story = {
	render: (args) => (
		<DropdownMenu.Root {...args}>
			<DropdownMenu.Trigger render={<Button variant="outline">Abrir Menu</Button>} />
			<DropdownMenu.Content>
				<DropdownMenu.Item>
					<UserIcon />
					Perfil
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<SettingsIcon />
					Configurações
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<LogOutIcon />
					Sair
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

/**
 * DropdownMenu com grupos e labels
 */
export const WithGroups: Story = {
	render: (args) => (
		<DropdownMenu.Root {...args}>
			<DropdownMenu.Trigger render={<Button variant="outline">Menu com Grupos</Button>} />
			<DropdownMenu.Content className="w-56">
				<DropdownMenu.Group>
					<DropdownMenu.GroupLabel>Minha Conta</DropdownMenu.GroupLabel>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<UserIcon />
						Perfil
						<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<MailIcon />
						Email
						<DropdownMenu.Shortcut>⌘E</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<MessageSquareIcon />
						Mensagens
						<DropdownMenu.Shortcut>⌘M</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<SettingsIcon />
						Configurações
						<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<LogOutIcon />
					Sair
					<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

/**
 * DropdownMenu com checkboxes
 */
export const WithCheckboxes: Story = {
	render: function Render(args) {
		const [showPanel, setShowPanel] = useState(true);
		const [showSidebar, setShowSidebar] = useState(false);
		const [showToolbar, setShowToolbar] = useState(true);

		return (
			<DropdownMenu.Root {...args}>
				<DropdownMenu.Trigger render={<Button variant="outline">Visualização</Button>} />
				<DropdownMenu.Content className="w-56">
					<DropdownMenu.Group>
						<DropdownMenu.GroupLabel>Mostrar</DropdownMenu.GroupLabel>
						<DropdownMenu.Separator />
						<DropdownMenu.CheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
							Painel lateral
						</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
							Sidebar
						</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
							Barra de ferramentas
						</DropdownMenu.CheckboxItem>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		);
	},
};

/**
 * DropdownMenu com radio group
 */
export const WithRadioGroup: Story = {
	render: function Render(args) {
		const [position, setPosition] = useState("bottom");

		return (
			<DropdownMenu.Root {...args}>
				<DropdownMenu.Trigger render={<Button variant="outline">Posição do Painel</Button>} />
				<DropdownMenu.Content className="w-56">
					<DropdownMenu.Group>
						<DropdownMenu.GroupLabel>Posição</DropdownMenu.GroupLabel>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup value={position} onValueChange={setPosition}>
							<DropdownMenu.RadioItem value="top">Topo</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="bottom">Inferior</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="right">Direita</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="left">Esquerda</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		);
	},
};

/**
 * DropdownMenu com submenu
 */
export const WithSubmenu: Story = {
	render: (args) => (
		<DropdownMenu.Root {...args}>
			<DropdownMenu.Trigger render={<Button variant="outline">Menu com Submenu</Button>} />
			<DropdownMenu.Content className="w-56">
				<DropdownMenu.Item>
					<UserIcon />
					Perfil
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<SettingsIcon />
					Configurações
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Submenu>
					<DropdownMenu.SubmenuTrigger>
						<UserPlusIcon />
						Convidar usuários
					</DropdownMenu.SubmenuTrigger>
					<DropdownMenu.SubmenuContent>
						<DropdownMenu.Item>
							<MailIcon />
							Por email
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<MessageSquareIcon />
							Por mensagem
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<PlusCircleIcon />
							Mais opções...
						</DropdownMenu.Item>
					</DropdownMenu.SubmenuContent>
				</DropdownMenu.Submenu>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<LogOutIcon />
					Sair
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

/**
 * DropdownMenu com item desabilitado
 */
export const WithDisabledItem: Story = {
	render: (args) => (
		<DropdownMenu.Root {...args}>
			<DropdownMenu.Trigger render={<Button variant="outline">Abrir Menu</Button>} />
			<DropdownMenu.Content>
				<DropdownMenu.Item>
					<UserIcon />
					Perfil
				</DropdownMenu.Item>
				<DropdownMenu.Item disabled>
					<SettingsIcon />
					Configurações (em breve)
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<MailIcon />
					Email
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

/**
 * DropdownMenu com ícone como trigger
 */
export const IconTrigger: Story = {
	render: (args) => (
		<DropdownMenu.Root {...args}>
			<DropdownMenu.Trigger
				render={
					<Button variant="ghost" size="icon">
						<MoreHorizontalIcon />
						<span className="sr-only">Abrir menu</span>
					</Button>
				}
			/>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item>
					<CopyIcon />
					Copiar
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<UserIcon />
					Editar
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<LogOutIcon />
					Excluir
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

/**
 * DropdownMenu com inset (indentação) para alinhamento
 */
export const WithInset: Story = {
	render: (args) => (
		<DropdownMenu.Root {...args}>
			<DropdownMenu.Trigger render={<Button variant="outline">Menu com Inset</Button>} />
			<DropdownMenu.Content className="w-56">
				<DropdownMenu.Group>
					<DropdownMenu.GroupLabel>Ações</DropdownMenu.GroupLabel>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<UserIcon />
						Com ícone
					</DropdownMenu.Item>
					<DropdownMenu.Item inset>Sem ícone (com inset)</DropdownMenu.Item>
					<DropdownMenu.Item>
						<MailIcon />
						Com ícone novamente
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

/**
 * DropdownMenu compacto
 */
export const Compact: Story = {
	render: (args) => (
		<DropdownMenu.Root {...args}>
			<DropdownMenu.Trigger
				render={
					<Button size="sm" variant="outline">
						Menu
					</Button>
				}
			/>
			<DropdownMenu.Content>
				<DropdownMenu.Item>Opção 1</DropdownMenu.Item>
				<DropdownMenu.Item>Opção 2</DropdownMenu.Item>
				<DropdownMenu.Item>Opção 3</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};
