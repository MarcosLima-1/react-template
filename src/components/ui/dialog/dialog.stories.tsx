import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { useId } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

/**
 * O componente Dialog exibe conteúdo modal sobreposto à página principal.
 *
 * **Características principais:**
 * - Modal com overlay (backdrop) semi-transparente
 * - Suporte a backdrop blur (quando suportado pelo navegador)
 * - Botão de fechar (X) customizável
 * - Header, Content e Footer estruturados
 * - Animações de entrada/saída (fade + zoom)
 * - Posicionamento centralizado
 * - Fechamento via ESC ou click no overlay
 * - Suporte a dark mode
 * - Responsivo (max-width adaptativo)
 * - Portal para renderização fora da hierarquia DOM
 *
 * **Uso:**
 * ```tsx
 * <Dialog.Root>
 *   <Dialog.Trigger asChild>
 *     <Button>Abrir Dialog</Button>
 *   </Dialog.Trigger>
 *   <Dialog.Content>
 *     <Dialog.Header>
 *       <Dialog.Title>Título</Dialog.Title>
 *       <Dialog.Description>Descrição</Dialog.Description>
 *     </Dialog.Header>
 *     <Dialog.Footer>
 *       <Button>Confirmar</Button>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog.Root>
 * ```
 */
const meta = {
	component: Dialog.Root,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs", "new"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByTitle("dialog-trigger");

		await userEvent.click(button);
		await new Promise((resolve) => setTimeout(resolve, 200));

		const title = canvas.getByText(/Título do Dialog/i);
		await expect(title).toBeInTheDocument();
	},
} satisfies Meta<typeof Dialog.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Dialog padrão com título e descrição
 */
export const Default: Story = {
	render: (args: ComponentProps<typeof Dialog.Root>, { canvasElement }) => (
		<Dialog.Root {...args}>
			<Dialog.Trigger
				render={
					<Button title="dialog-trigger" variant="outline">
						Open Dialog
					</Button>
				}
			/>
			<Dialog.Content portalContainer={canvasElement}>
				<Dialog.Header>
					<Dialog.Title>Título do Dialog</Dialog.Title>
					<Dialog.Description>Esta é a descrição do dialog. Forneça informações relevantes aqui.</Dialog.Description>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	),
};

/**
 * Dialog com footer e botões de ação
 */
export const WithFooter: Story = {
	render: (args: ComponentProps<typeof Dialog.Root>, { canvasElement }) => (
		<Dialog.Root {...args}>
			<Dialog.Trigger
				render={
					<Button title="dialog-trigger" variant="outline">
						Abrir Dialog
					</Button>
				}
			/>
			<Dialog.Content portalContainer={canvasElement}>
				<Dialog.Header>
					<Dialog.Title>Título do Dialog - Confirmar ação</Dialog.Title>
					<Dialog.Description>Tem certeza que deseja continuar? Esta ação não pode ser desfeita.</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer>
					<Dialog.Close>
						<Button variant="outline">Cancelar</Button>
					</Dialog.Close>
					<Button variant="primary">Confirmar</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	),
};

/**
 * Dialog com footer mostrando botão Close automático
 */
export const WithFooterCloseButton: Story = {
	render: (args: ComponentProps<typeof Dialog.Root>, { canvasElement }) => (
		<Dialog.Root {...args}>
			<Dialog.Trigger
				render={
					<Button title="dialog-trigger" variant="outline">
						Abrir Dialog
					</Button>
				}
			/>
			<Dialog.Content portalContainer={canvasElement}>
				<Dialog.Header>
					<Dialog.Title>Título do Dialog - Informação</Dialog.Title>
					<Dialog.Description>Esta é uma mensagem informativa.</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer showCloseButton>
					<Button variant="primary">OK</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	),
};

/**
 * Dialog sem botão de fechar (X)
 */
export const WithoutCloseButton: Story = {
	render: (args: ComponentProps<typeof Dialog.Root>, { canvasElement }) => (
		<Dialog.Root {...args}>
			<Dialog.Trigger
				render={
					<Button title="dialog-trigger" variant="outline">
						Abrir Dialog
					</Button>
				}
			/>
			<Dialog.Content portalContainer={canvasElement} showCloseButton={false}>
				<Dialog.Header>
					<Dialog.Title>Título do Dialog - Ação obrigatória</Dialog.Title>
					<Dialog.Description>Você deve completar esta ação antes de continuar.</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer>
					<Dialog.Close>
						<Button variant="primary">Completar</Button>
					</Dialog.Close>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	),
};

/**
 * Dialog com formulário
 */
export const WithForm: Story = {
	render: (args: ComponentProps<typeof Dialog.Root>, { canvasElement }) => {
		const nameId = useId();
		const emailId = useId();

		return (
			<Dialog.Root {...args}>
				<Dialog.Trigger render={<Button title="dialog-trigger">Editar perfil</Button>} />
				<Dialog.Content portalContainer={canvasElement}>
					<Dialog.Header>
						<Dialog.Title>Título do Dialog - Editar perfil</Dialog.Title>
						<Dialog.Description>Faça alterações no seu perfil aqui. Clique em salvar quando terminar.</Dialog.Description>
					</Dialog.Header>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<label htmlFor={nameId} className="font-medium text-sm">
								Nome
							</label>
							<Input id={nameId} defaultValue="Pedro Duarte" placeholder="Digite seu nome" />
						</div>
						<div className="grid gap-2">
							<label htmlFor={emailId} className="font-medium text-sm">
								Email
							</label>
							<Input id={emailId} type="email" defaultValue="pedro@example.com" placeholder="Digite seu email" />
						</div>
					</div>
					<Dialog.Footer>
						<Dialog.Close>
							<Button variant="outline">Cancelar</Button>
						</Dialog.Close>
						<Button variant="primary">Salvar alterações</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		);
	},
};

/**
 * Dialog de confirmação de exclusão
 */
export const DeleteConfirmation: Story = {
	render: (args: ComponentProps<typeof Dialog.Root>, { canvasElement }) => (
		<Dialog.Root {...args}>
			<Dialog.Trigger
				render={
					<Button title="dialog-trigger" variant="destructive">
						Excluir item
					</Button>
				}
			/>
			<Dialog.Content portalContainer={canvasElement}>
				<Dialog.Header>
					<Dialog.Title>Título do Dialog - Excluir item</Dialog.Title>
					<Dialog.Description>Tem certeza que deseja excluir este item? Esta ação é permanente e não pode ser desfeita.</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer>
					<Dialog.Close>
						<Button variant="outline">Cancelar</Button>
					</Dialog.Close>
					<Button variant="destructive">Excluir</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	),
};

/**
 * Dialog customizado com conteúdo rico
 */
export const WithRichContent: Story = {
	render: (args: ComponentProps<typeof Dialog.Root>, { canvasElement }) => (
		<Dialog.Root {...args}>
			<Dialog.Trigger
				render={
					<Button title="dialog-trigger" variant="outline">
						Ver detalhes
					</Button>
				}
			/>
			<Dialog.Content portalContainer={canvasElement} className="max-w-2xl">
				<Dialog.Header>
					<Dialog.Title>Título do Dialog - Detalhes do produto</Dialog.Title>
					<Dialog.Description>Informações completas sobre o produto selecionado.</Dialog.Description>
				</Dialog.Header>
				<div className="space-y-4">
					<div>
						<h3 className="mb-2 font-semibold">Especificações técnicas</h3>
						<ul className="list-inside list-disc space-y-1 text-muted-foreground text-sm">
							<li>Processador: Intel Core i7 12ª geração</li>
							<li>Memória RAM: 16GB DDR4</li>
							<li>Armazenamento: 512GB SSD</li>
							<li>Tela: 15.6" Full HD</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-2 font-semibold">Garantia</h3>
						<p className="text-muted-foreground text-sm">12 meses de garantia do fabricante</p>
					</div>
				</div>
				<Dialog.Footer showCloseButton />
			</Dialog.Content>
		</Dialog.Root>
	),
};

/**
 * Dialog compacto
 */
export const Compact: Story = {
	render: (args: ComponentProps<typeof Dialog.Root>, { canvasElement }) => (
		<Dialog.Root {...args}>
			<Dialog.Trigger
				render={
					<Button title="dialog-trigger" size="sm">
						Abrir
					</Button>
				}
			/>
			<Dialog.Content portalContainer={canvasElement} className="max-w-xs">
				<Dialog.Header>
					<Dialog.Title>Título do Dialog - Aviso</Dialog.Title>
				</Dialog.Header>
				<p className="text-sm">Operação concluída com sucesso!</p>
				<Dialog.Footer showCloseButton />
			</Dialog.Content>
		</Dialog.Root>
	),
};
