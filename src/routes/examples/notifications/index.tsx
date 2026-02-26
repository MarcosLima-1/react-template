import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertDialog } from "@/modules/alert/components/alert-dialog";
import type { Alert, ImageAlert, TextAlert, TextImageAlert } from "@/modules/alert/types/alert";
import { toast } from "@/modules/notification/components/toasts";

/** Distributed Omit so discriminated props (content, src, …) remain accessible. */
type AlertInput = Omit<TextAlert, "id"> | Omit<ImageAlert, "id"> | Omit<TextImageAlert, "id">;

export const Route = createFileRoute("/examples/notifications/")({
	component: RouteComponent,
});

// ---------------------------------------------------------------------------
// Alert Dialog demo helpers
// ---------------------------------------------------------------------------

let alertCounter = 0;

function makeId() {
	return `demo-${++alertCounter}`;
}

const markdownExample = `## O que há de novo

### Melhorias
- Desempenho geral aprimorado
- Novo tema escuro

### Correções
- Corrigido erro ao exportar relatórios em PDF
- Resolvido problema de login em dispositivos móveis

> Obrigado a todos que reportaram os problemas!
`;

function RouteComponent() {
	const [alerts, setAlerts] = useState<Alert[]>([]);

	function addAlert(alert: AlertInput) {
		setAlerts((prev) => [...prev, { ...alert, id: makeId() } as Alert]);
	}

	function addAlertQueue() {
		const id1 = makeId();
		const id2 = makeId();
		const id3 = makeId();
		setAlerts((prev) => [
			...prev,
			{ id: id1, variant: "text", title: "Alerta 1 de 3", content: "Esta é a **primeira** mensagem da fila." },
			{ id: id2, variant: "text", title: "Alerta 2 de 3", content: "Esta é a **segunda** mensagem da fila." },
			{
				id: id3,
				variant: "text",
				title: "Alerta 3 de 3",
				content: "Esta é a **última** mensagem da fila. Tudo concluído!",
			},
		]);
	}

	return (
		<div className="container mx-auto my-12 max-w-4xl space-y-12 p-4 md:p-0">
			{/* Alert Dialog é montado uma vez e gerencia a fila internamente */}
			<AlertDialog alerts={alerts} />

			<header>
				<h1 className="font-bold text-4xl tracking-tight">Notificações</h1>
				<p className="mt-2 text-muted-foreground">Demonstração do sistema de toasts e alertas disponíveis no projeto.</p>
			</header>

			<div className="grid gap-12">
				{/* ------------------------------------------------------------------ */}
				{/* TOAST                                                               */}
				{/* ------------------------------------------------------------------ */}
				<section className="space-y-4">
					<div>
						<h2 className="font-semibold text-2xl">Toast</h2>
						<p className="text-muted-foreground text-sm">
							Notificações temporárias exibidas no canto da tela. Desaparecem automaticamente após alguns segundos.
						</p>
					</div>

					<Card.Root className="p-6">
						<div className="space-y-6">
							{/* Variantes básicas */}
							<div className="space-y-2">
								<h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">Variantes</h3>
								<div className="flex flex-wrap gap-3">
									<Button
										variant="outline"
										onClick={() =>
											toast.success({
												title: "Operação realizada com sucesso!",
											})
										}
									>
										Sucesso
									</Button>
									<Button
										variant="outline"
										onClick={() =>
											toast.error({
												title: "Ocorreu um erro inesperado.",
											})
										}
									>
										Erro
									</Button>
									<Button
										variant="outline"
										onClick={() =>
											toast.warning({
												title: "Atenção! Verifique os dados.",
											})
										}
									>
										Aviso
									</Button>
									<Button
										variant="outline"
										onClick={() =>
											toast.info({
												title: "Uma atualização está disponível.",
											})
										}
									>
										Info
									</Button>
								</div>
							</div>

							{/* Com descrição */}
							<div className="space-y-2">
								<h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">Com descrição</h3>
								<div className="flex flex-wrap gap-3">
									<Button
										onClick={() =>
											toast.success({
												title: "Evento criado!",
												description: "Domingo, 3 de Dezembro de 2023 às 9:00 AM",
											})
										}
									>
										Sucesso com descrição
									</Button>
									<Button
										variant="destructive"
										onClick={() =>
											toast.error({
												title: "Falha ao salvar.",
												description: "Não foi possível se conectar ao servidor. Tente novamente.",
											})
										}
									>
										Erro com descrição
									</Button>
									<Button
										variant="secondary"
										onClick={() =>
											toast.warning({
												title: "Sessão expirando.",
												description: "Sua sessão expirará em 5 minutos. Salve seu trabalho.",
											})
										}
									>
										Aviso com descrição
									</Button>
									<Button
										variant="outline"
										onClick={() =>
											toast.info({
												title: "Nova versão disponível.",
												description: "A versão 2.1.0 foi lançada com melhorias de desempenho.",
											})
										}
									>
										Info com descrição
									</Button>
								</div>
							</div>

							{/* Com botão de ação */}
							<div className="space-y-2">
								<h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">Com botão de ação</h3>
								<div className="flex flex-wrap gap-3">
									<Button
										onClick={() =>
											toast.success({
												title: "Arquivo movido para a lixeira.",
												description: "O arquivo foi excluído.",
												actionProps: {
													content: "Desfazer",
													onClick: () =>
														toast.info({
															title: "Ação desfeita.",
															description: "O arquivo foi restaurado.",
														}),
												},
											})
										}
									>
										Sucesso + Desfazer
									</Button>
									<Button
										variant="destructive"
										onClick={() =>
											toast.error({
												title: "Falha no envio.",
												description: "Não foi possível enviar o formulário.",
												actionProps: {
													content: "Tentar novamente",
													onClick: () =>
														toast.success({
															title: "Enviado com sucesso!",
														}),
												},
											})
										}
									>
										Erro + Tentar novamente
									</Button>
								</div>
							</div>

							{/* Multiplos simultâneos */}
							<div className="space-y-2">
								<h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">Múltiplos simultâneos</h3>
								<div className="flex flex-wrap gap-3">
									<Button
										variant="outline"
										onClick={() => {
											toast.success({ title: "Sucesso!", description: "Item salvo." });
											toast.warning({ title: "Aviso!", description: "Espaço em disco baixo." });
											toast.info({ title: "Info!", description: "Sincronização em andamento." });
										}}
									>
										Disparar 3 toasts
									</Button>
								</div>
							</div>
						</div>
					</Card.Root>
				</section>

				{/* ------------------------------------------------------------------ */}
				{/* ALERT DIALOG                                                        */}
				{/* ------------------------------------------------------------------ */}
				<section className="space-y-4">
					<div>
						<h2 className="font-semibold text-2xl">Alert Dialog</h2>
						<p className="text-muted-foreground text-sm">
							Alertas modais exibidos em sequência. Novos alertas são enfileirados e exibidos um de cada vez.
						</p>
					</div>

					<Card.Root className="p-6">
						<div className="space-y-6">
							{/* Variante: imagem */}
							<div className="space-y-2">
								<h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">Variante: imagem</h3>
								<div className="flex flex-wrap gap-3">
									<Button
										variant="outline"
										onClick={() =>
											addAlert({
												variant: "image",
												title: "Promoção especial",
												src: "https://picsum.photos/seed/promo/600/300",
												alt: "Banner de promoção",
											})
										}
									>
										Alerta de imagem
									</Button>
								</div>
							</div>

							{/* Variante: texto + imagem */}
							<div className="space-y-2">
								<h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">Variante: texto + imagem</h3>
								<div className="flex flex-wrap gap-3">
									<Button
										variant="outline"
										onClick={() =>
											addAlert({
												variant: "text-image",
												title: "Nova funcionalidade!",
												content:
													"Agora você pode exportar seus relatórios em PDF diretamente pela plataforma. Acesse o menu Relatórios para experimentar.",
												src: "https://picsum.photos/seed/feature/600/200",
												alt: "Prévia da nova funcionalidade",
											})
										}
									>
										Alerta texto + imagem
									</Button>
								</div>
							</div>
							{/* Variante: texto */}
							<div className="space-y-2">
								<h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">Variante: texto</h3>
								<div className="flex flex-wrap gap-3">
									<Button
										variant="outline"
										onClick={() =>
											addAlert({
												variant: "text",
												title: "Notas da versão 2.1.0",
												content: markdownExample,
											})
										}
									>
										Alerta de texto
									</Button>
									<Button
										variant="outline"
										onClick={() =>
											addAlert({
												variant: "text",
												content:
													"**Aviso importante:** A partir de 01/03/2026, o suporte à versão 1.x será encerrado.\n\nCertifique-se de migrar para a versão 2.x antes dessa data.",
											})
										}
									>
										Alerta de texto (sem título)
									</Button>
								</div>
							</div>
							{/* Fila de alertas */}
							<div className="space-y-2">
								<h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">Fila de alertas</h3>
								<p className="text-muted-foreground text-xs">
									Múltiplos alertas são enfileirados e exibidos um após o outro ao clicar em "Continuar".
								</p>
								<div className="flex flex-wrap gap-3">
									<Button onClick={addAlertQueue}>Enfileirar 3 alertas</Button>
								</div>
							</div>
						</div>
					</Card.Root>
				</section>
			</div>
		</div>
	);
}
