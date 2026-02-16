import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircleIcon, RocketIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Landing } from "@/components/ui/landing";

/**
 * Os componentes Landing fornecem estrutura e estilização para páginas de landing page.
 *
 * **Componentes disponíveis:**
 * - **Landing.Page**: Container principal da landing page com altura mínima e espaçamento
 * - **Landing.Section**: Seção da landing page com centralização e gaps
 * - **Landing.Container**: Container responsivo com layout flex
 * - **Landing.Title**: Título estilizado com linha decorativa e descrição opcional
 *
 * **Características principais:**
 * - Layout responsivo e centralizado
 * - Espaçamento consistente entre seções
 * - Títulos com linha decorativa
 * - Suporte a descrições nos títulos
 * - Suporte a h1 ou h2 para SEO
 * - Padding responsivo (mobile/desktop)
 * - Container com tamanho máximo configurável
 *
 * **Uso:**
 * ```tsx
 * <Landing.Page>
 *   <Landing.Section>
 *     <Landing.Title title="Título" description="Descrição" />
 *     <Landing.Container>
 *       // Conteúdo
 *     </Landing.Container>
 *   </Landing.Section>
 * </Landing.Page>
 * ```
 */
const meta = {
	component: Landing.Page,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs", "new"],
} satisfies Meta<typeof Landing.Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Landing page básica com título e container
 */
export const Default: Story = {
	render: (args) => (
		<Landing.Page {...args}>
			<Landing.Section>
				<Landing.Title title="Bem-vindo ao nosso produto" description="A solução completa para suas necessidades" isH1 />
				<Landing.Container>
					<p className="text-center text-muted-foreground">Este é um exemplo básico de landing page usando os componentes Landing.</p>
				</Landing.Container>
			</Landing.Section>
		</Landing.Page>
	),
};

/**
 * Landing page com múltiplas seções
 */
export const MultipleSections: Story = {
	render: (args) => (
		<Landing.Page {...args}>
			<Landing.Section>
				<Landing.Title title="Nossa Plataforma" description="Tudo que você precisa em um só lugar" isH1 />
				<Landing.Container>
					<p className="max-w-2xl text-center text-muted-foreground">
						Uma solução completa e moderna para gerenciar seus projetos, colaborar com sua equipe e alcançar seus objetivos.
					</p>
					<div className="mt-8 flex justify-center gap-4">
						<Button size="lg" variant="primary">
							Começar agora
						</Button>
						<Button size="lg" variant="outline">
							Saiba mais
						</Button>
					</div>
				</Landing.Container>
			</Landing.Section>

			<Landing.Section>
				<Landing.Title title="Recursos" description="Tudo que você precisa para ter sucesso" />
				<Landing.Container>
					<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
						<Card.Root>
							<Card.Header>
								<RocketIcon className="mb-2 size-8 text-primary" />
								<Card.Title>Rápido</Card.Title>
								<Card.Description>Performance otimizada para produtividade máxima</Card.Description>
							</Card.Header>
						</Card.Root>
						<Card.Root>
							<Card.Header>
								<ZapIcon className="mb-2 size-8 text-primary" />
								<Card.Title>Poderoso</Card.Title>
								<Card.Description>Recursos avançados para todas as suas necessidades</Card.Description>
							</Card.Header>
						</Card.Root>
						<Card.Root>
							<Card.Header>
								<SparklesIcon className="mb-2 size-8 text-primary" />
								<Card.Title>Intuitivo</Card.Title>
								<Card.Description>Interface amigável e fácil de usar</Card.Description>
							</Card.Header>
						</Card.Root>
					</div>
				</Landing.Container>
			</Landing.Section>

			<Landing.Section>
				<Landing.Title title="Por que escolher nossa solução?" />
				<Landing.Container>
					<div className="max-w-2xl space-y-4">
						<div className="flex items-start gap-4">
							<CheckCircleIcon className="mt-1 size-6 shrink-0 text-primary" />
							<div>
								<h3 className="mb-2 font-semibold text-lg">Fácil de começar</h3>
								<p className="text-muted-foreground">Configure tudo em minutos, sem complicações</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<CheckCircleIcon className="mt-1 size-6 shrink-0 text-primary" />
							<div>
								<h3 className="mb-2 font-semibold text-lg">Suporte 24/7</h3>
								<p className="text-muted-foreground">Nossa equipe está sempre disponível para ajudar</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<CheckCircleIcon className="mt-1 size-6 shrink-0 text-primary" />
							<div>
								<h3 className="mb-2 font-semibold text-lg">Atualizações constantes</h3>
								<p className="text-muted-foreground">Novos recursos e melhorias toda semana</p>
							</div>
						</div>
					</div>
				</Landing.Container>
			</Landing.Section>
		</Landing.Page>
	),
};

/**
 * Landing page com hero section
 */
export const WithHero: Story = {
	render: (args) => (
		<Landing.Page {...args}>
			<Landing.Section className="min-h-[60vh] justify-center">
				<div className="max-w-4xl space-y-6 text-center">
					<h1 className="bg-linear-to-r from-primary to-primary/60 bg-clip-text font-bold text-5xl text-transparent md:text-7xl">
						Transforme suas ideias em realidade
					</h1>
					<p className="mx-auto max-w-2xl text-muted-foreground text-xl">
						A plataforma mais completa para criar, gerenciar e escalar seus projetos com eficiência.
					</p>
					<div className="flex justify-center gap-4 pt-4">
						<Button size="lg" variant="primary">
							Começar gratuitamente
						</Button>
						<Button size="lg" variant="outline">
							Ver demonstração
						</Button>
					</div>
				</div>
			</Landing.Section>

			<Landing.Section>
				<Landing.Title title="Trusted by thousands" description="Empresas de todos os tamanhos confiam em nós" />
				<Landing.Container>
					<div className="grid grid-cols-2 items-center gap-8 opacity-50 md:grid-cols-4">
						<div className="text-center font-bold text-2xl">COMPANY</div>
						<div className="text-center font-bold text-2xl">BRAND</div>
						<div className="text-center font-bold text-2xl">CORP</div>
						<div className="text-center font-bold text-2xl">STARTUP</div>
					</div>
				</Landing.Container>
			</Landing.Section>
		</Landing.Page>
	),
};

/**
 * Seção individual de landing page
 */
export const SectionOnly: Story = {
	render: () => (
		<Landing.Section>
			<Landing.Title title="Recursos Principais" description="Tudo que você precisa em um só lugar" />
			<Landing.Container>
				<div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
					<Card.Root>
						<Card.Header>
							<Card.Title>Colaboração em tempo real</Card.Title>
							<Card.Description>Trabalhe junto com sua equipe em tempo real, onde quer que estejam</Card.Description>
						</Card.Header>
					</Card.Root>
					<Card.Root>
						<Card.Header>
							<Card.Title>Integração completa</Card.Title>
							<Card.Description>Conecte-se com suas ferramentas favoritas de forma simples</Card.Description>
						</Card.Header>
					</Card.Root>
				</div>
			</Landing.Container>
		</Landing.Section>
	),
};

/**
 * Título de landing page isolado
 */
export const TitleOnly: Story = {
	render: () => (
		<div className="p-8">
			<Landing.Title title="Título Principal" description="Descrição opcional que complementa o título" isH1 />
		</div>
	),
};

/**
 * Título sem descrição
 */
export const TitleWithoutDescription: Story = {
	render: () => (
		<div className="p-8">
			<Landing.Title title="Título Simples" />
		</div>
	),
};

/**
 * Container customizado
 */
export const CustomContainer: Story = {
	render: () => (
		<Landing.Container className="rounded-xl bg-muted/50 p-8">
			<h3 className="mb-4 font-bold text-2xl">Container Customizado</h3>
			<p className="text-muted-foreground">
				Este container tem estilização customizada usando className. Você pode personalizar cores, bordas, espaçamento e mais.
			</p>
			<div className="mt-6 flex gap-4">
				<Button>Ação primária</Button>
				<Button variant="outline">Ação secundária</Button>
			</div>
		</Landing.Container>
	),
};

/**
 * Landing page com call-to-action
 */
export const WithCTA: Story = {
	render: (args) => (
		<Landing.Page {...args}>
			<Landing.Section>
				<Landing.Title title="Pronto para começar?" description="Junte-se a milhares de usuários satisfeitos" />
				<Landing.Container>
					<Card.Root className="max-w-2xl border-primary/20 bg-primary/5">
						<Card.Header className="text-center">
							<Card.Title className="text-3xl">Comece hoje mesmo</Card.Title>
							<Card.Description>Teste gratuitamente por 14 dias. Sem compromisso, cancele quando quiser.</Card.Description>
						</Card.Header>
						<Card.Content className="flex flex-col items-center gap-4">
							<Button size="lg" variant="primary" className="w-full max-w-sm">
								Criar conta grátis
							</Button>
							<p className="text-muted-foreground text-sm">Não é necessário cartão de crédito</p>
						</Card.Content>
					</Card.Root>
				</Landing.Container>
			</Landing.Section>
		</Landing.Page>
	),
};
