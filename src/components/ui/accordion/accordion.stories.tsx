import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Accordion } from "@/components/ui/accordion";

/**
 * O componente Accordion permite exibir conteúdo recolhível em seções expansíveis.
 *
 * **Características principais:**
 * - Suporta múltiplos itens expansíveis
 * - Modo único (apenas um item aberto) ou múltiplo (vários itens abertos)
 * - Animações suaves de abertura/fechamento
 * - Ícones de indicação (ChevronDown/ChevronUp)
 * - Suporte a navegação por teclado
 * - Estados visuais: hover, focus, disabled
 * - Suporte a dark mode
 * - Bordas entre itens
 * - Links com underline no conteúdo
 *
 * **Uso:**
 * ```tsx
 * <Accordion.Root>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger>Título 1</Accordion.Trigger>
 *     <Accordion.Content>Conteúdo 1</Accordion.Content>
 *   </Accordion.Item>
 *   <Accordion.Item value="item-2">
 *     <Accordion.Trigger>Título 2</Accordion.Trigger>
 *     <Accordion.Content>Conteúdo 2</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 * ```
 */
const meta = {
	component: Accordion.Root,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs", "new"],
	argTypes: {
		disabled: { control: "boolean" },
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const triggers = canvas.getAllByRole("button");

		// Click no primeiro item para expandir
		await userEvent.click(triggers[0]);
		await new Promise((resolve) => setTimeout(resolve, 300));

		// Verifica se expandiu
		await expect(triggers[0]).toHaveAttribute("aria-expanded", "true");
	},
} satisfies Meta<typeof Accordion.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Accordion padrão com modo único (apenas um item aberto por vez)
 */
export const Default: Story = {
	render: (args) => (
		<Accordion.Root className="w-96" {...args}>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>O que é React?</Accordion.Trigger>
				<Accordion.Content>
					<p>
						React é uma biblioteca JavaScript para construir interfaces de usuário. Foi desenvolvida pelo Facebook e é mantida por uma
						comunidade de desenvolvedores e empresas.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Como instalar o React?</Accordion.Trigger>
				<Accordion.Content>
					<p>
						Você pode criar um novo projeto React usando ferramentas como Vite, Create React App, ou Next.js. Execute{" "}
						<code>npm create vite@latest</code> para começar rapidamente.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>Quais são as vantagens do React?</Accordion.Trigger>
				<Accordion.Content>
					<p>React oferece:</p>
					<ul>
						<li>Componentes reutilizáveis</li>
						<li>Virtual DOM para performance otimizada</li>
						<li>Grande ecossistema e comunidade</li>
						<li>Suporte a TypeScript</li>
					</ul>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	),
};

/**
 * Accordion com múltiplos itens abertos simultaneamente
 */
export const Multiple: Story = {
	render: (args) => (
		<Accordion.Root className="w-96" multiple {...args}>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Frontend</Accordion.Trigger>
				<Accordion.Content>
					<p>Tecnologias de frontend incluem HTML, CSS, JavaScript, React, Vue, Angular, e muito mais.</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Backend</Accordion.Trigger>
				<Accordion.Content>
					<p>Tecnologias de backend incluem Node.js, Python, Java, PHP, Ruby, e diversos frameworks.</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>DevOps</Accordion.Trigger>
				<Accordion.Content>
					<p>DevOps envolve Docker, Kubernetes, CI/CD, monitoramento, e automação de infraestrutura.</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	),
};

/**
 * Accordion com item padrão aberto
 */
export const WithDefaultValue: Story = {
	render: (args) => (
		<Accordion.Root className="w-96" defaultValue={["item-2"]} {...args}>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Sobre nós</Accordion.Trigger>
				<Accordion.Content>
					<p>Somos uma empresa dedicada a criar soluções inovadoras.</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Nossa missão</Accordion.Trigger>
				<Accordion.Content>
					<p>Nossa missão é transformar ideias em realidade através da tecnologia.</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>Contato</Accordion.Trigger>
				<Accordion.Content>
					<p>
						Entre em contato conosco através do email <a href="mailto:contato@empresa.com">contato@empresa.com</a>
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	),
};

/**
 * Accordion com item desabilitado
 */
export const WithDisabledItem: Story = {
	render: (args) => (
		<Accordion.Root className="w-96" {...args}>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Item disponível 1</Accordion.Trigger>
				<Accordion.Content>
					<p>Este item está disponível e pode ser expandido.</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2" disabled>
				<Accordion.Trigger>Item desabilitado</Accordion.Trigger>
				<Accordion.Content>
					<p>Este conteúdo não pode ser acessado.</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>Item disponível 2</Accordion.Trigger>
				<Accordion.Content>
					<p>Este item está disponível e pode ser expandido.</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	),
};

/**
 * Accordion com conteúdo rico (imagens, links, formatação)
 */
export const WithRichContent: Story = {
	render: (args) => (
		<Accordion.Root className="w-96" {...args}>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Guia de instalação</Accordion.Trigger>
				<Accordion.Content>
					<p>Siga os passos abaixo para instalar:</p>
					<ol>
						<li>Clone o repositório</li>
						<li>Execute npm install</li>
						<li>Configure as variáveis de ambiente</li>
						<li>Execute npm run dev</li>
					</ol>
					<p>
						Para mais informações, visite <a href="https://example.com">nossa documentação</a>.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Solução de problemas</Accordion.Trigger>
				<Accordion.Content>
					<p>Se encontrar problemas:</p>
					<p>1. Verifique os logs de erro</p>
					<p>2. Limpe o cache (npm clean cache)</p>
					<p>3. Reinstale as dependências</p>
					<p>
						Ainda com problemas? <a href="https://example.com/support">Envie um ticket</a>
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	),
};

/**
 * Accordion compacto
 */
export const Compact: Story = {
	render: (args) => (
		<Accordion.Root className="w-64" {...args}>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Ajuda</Accordion.Trigger>
				<Accordion.Content>
					<p>Central de ajuda disponível 24/7</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>FAQ</Accordion.Trigger>
				<Accordion.Content>
					<p>Perguntas frequentes</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>Suporte</Accordion.Trigger>
				<Accordion.Content>
					<p>Entre em contato com o suporte</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	),
};
