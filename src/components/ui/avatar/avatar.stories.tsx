import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckIcon, StarIcon, UserIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

/**
 * O componente Avatar exibe imagens de perfil de usuários ou fallbacks com iniciais.
 *
 * **Características principais:**
 * - Suporta imagem de perfil ou fallback com iniciais
 * - Três tamanhos: sm (small), default, lg (large)
 * - Badges customizáveis para indicadores de status
 * - AvatarGroup para exibir múltiplos avatares sobrepostos
 * - AvatarGroupCount para mostrar contador de avatares adicionais
 * - Borda automática com mix-blend para dark/light mode
 * - Imagens circulares com aspect ratio preservado
 * - Suporte a dark mode
 * - Fallback automático quando imagem não carrega
 *
 * **Uso:**
 * ```tsx
 * <Avatar.Root>
 *   <Avatar.Image src="/user.jpg" alt="User" />
 *   <Avatar.Fallback>JD</Avatar.Fallback>
 *   <Avatar.Badge><CheckIcon /></Avatar.Badge>
 * </Avatar.Root>
 * ```
 */
const meta = {
	component: Avatar.Root,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs", "new"],
	argTypes: {
		size: { control: "select", options: ["sm", "default", "lg"] },
	},
} satisfies Meta<typeof Avatar.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Avatar com imagem
 */
export const Default: Story = {
	render: (args) => (
		<Avatar.Root {...args}>
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	),
};

/**
 * Avatar com fallback (iniciais)
 */
export const WithFallback: Story = {
	render: (args) => (
		<Avatar.Root {...args}>
			<Avatar.Image src="/invalid-image.jpg" alt="Avatar" />
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar.Root>
	),
};

/**
 * Avatar pequeno (sm)
 */
export const Small: Story = {
	args: {
		size: "sm",
	},
	render: (args) => (
		<Avatar.Root {...args}>
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	),
};

/**
 * Avatar grande (lg)
 */
export const Large: Story = {
	args: {
		size: "lg",
	},
	render: (args) => (
		<Avatar.Root {...args}>
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	),
};

/**
 * Avatar com badge de status (online)
 */
export const WithBadge: Story = {
	render: (args) => (
		<Avatar.Root {...args}>
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>CN</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
	),
};

/**
 * Avatar com badge de ícone (verificado)
 */
export const WithIconBadge: Story = {
	render: (args) => (
		<Avatar.Root {...args}>
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>CN</Avatar.Fallback>
			<Avatar.Badge>
				<CheckIcon />
			</Avatar.Badge>
		</Avatar.Root>
	),
};

/**
 * Avatar com badge de estrela
 */
export const WithStarBadge: Story = {
	render: (args) => (
		<Avatar.Root size="lg" {...args}>
			<Avatar.Image src="https://github.com/shadcn.png" alt="Avatar" />
			<Avatar.Fallback>CN</Avatar.Fallback>
			<Avatar.Badge className="bg-yellow-500">
				<StarIcon />
			</Avatar.Badge>
		</Avatar.Root>
	),
};

/**
 * Grupo de avatares (AvatarGroup)
 */
export const Group: Story = {
	render: (args) => (
		<Avatar.Group>
			<Avatar.Root {...args}>
				<Avatar.Image src="https://github.com/shadcn.png" alt="User 1" />
				<Avatar.Fallback>U1</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root {...args}>
				<Avatar.Image src="/invalid.jpg" alt="User 2" />
				<Avatar.Fallback>U2</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root {...args}>
				<Avatar.Image src="/invalid.jpg" alt="User 3" />
				<Avatar.Fallback>U3</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root {...args}>
				<Avatar.Image src="/invalid.jpg" alt="User 4" />
				<Avatar.Fallback>U4</Avatar.Fallback>
			</Avatar.Root>
		</Avatar.Group>
	),
};

/**
 * Grupo de avatares com contador
 */
export const GroupWithCount: Story = {
	render: (args) => (
		<Avatar.Group>
			<Avatar.Root {...args}>
				<Avatar.Image src="https://github.com/shadcn.png" alt="User 1" />
				<Avatar.Fallback>U1</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root {...args}>
				<Avatar.Image src="/invalid.jpg" alt="User 2" />
				<Avatar.Fallback>U2</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root {...args}>
				<Avatar.Image src="/invalid.jpg" alt="User 3" />
				<Avatar.Fallback>U3</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.GroupCount>+5</Avatar.GroupCount>
		</Avatar.Group>
	),
};

/**
 * Grupo de avatares pequenos
 */
export const SmallGroup: Story = {
	render: (args) => (
		<Avatar.Group>
			<Avatar.Root size="sm" {...args}>
				<Avatar.Image src="https://github.com/shadcn.png" alt="User 1" />
				<Avatar.Fallback>U1</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="sm" {...args}>
				<Avatar.Fallback>U2</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="sm" {...args}>
				<Avatar.Fallback>U3</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.GroupCount>+12</Avatar.GroupCount>
		</Avatar.Group>
	),
};

/**
 * Grupo de avatares grandes
 */
export const LargeGroup: Story = {
	render: (args) => (
		<Avatar.Group>
			<Avatar.Root size="lg" {...args}>
				<Avatar.Image src="https://github.com/shadcn.png" alt="User 1" />
				<Avatar.Fallback>U1</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="lg" {...args}>
				<Avatar.Fallback>U2</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="lg" {...args}>
				<Avatar.Fallback>U3</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.GroupCount>+8</Avatar.GroupCount>
		</Avatar.Group>
	),
};

/**
 * Avatar com fallback e ícone
 */
export const WithIconFallback: Story = {
	render: (args) => (
		<Avatar.Root {...args}>
			<Avatar.Image src="/invalid.jpg" alt="User" />
			<Avatar.Fallback>
				<UserIcon />
			</Avatar.Fallback>
		</Avatar.Root>
	),
};

/**
 * Avatares em diferentes tamanhos lado a lado
 */
export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar.Root size="sm">
				<Avatar.Image src="https://github.com/shadcn.png" alt="Small" />
				<Avatar.Fallback>SM</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="default">
				<Avatar.Image src="https://github.com/shadcn.png" alt="Default" />
				<Avatar.Fallback>DF</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="lg">
				<Avatar.Image src="https://github.com/shadcn.png" alt="Large" />
				<Avatar.Fallback>LG</Avatar.Fallback>
			</Avatar.Root>
		</div>
	),
};
