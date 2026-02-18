import { createFileRoute } from "@tanstack/react-router";
import { UserIcon } from "lucide-react";
import { toast } from "sonner";

import { Accordion } from "@/components/ui/accordion/index.tsx";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { InputOTP } from "@/components/ui/input-otp";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/examples/components/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto my-12 space-y-12 p-4 md:p-0">
			<header>
				<h1 className="font-bold text-4xl tracking-tight">Componentes</h1>
				<p className="mt-2 text-muted-foreground">Exemplos de uso para os componentes de UI disponíveis no projeto.</p>
			</header>

			<div className="grid gap-12">
				<section className="space-y-4">
					<h2 className="font-semibold text-2xl">Accordion</h2>
					<div className="rounded-lg border p-6">
						<Accordion.Root className="w-full max-w-md">
							<Accordion.Item value="item-1">
								<Accordion.Trigger>É acessível?</Accordion.Trigger>
								<Accordion.Content>Sim. Ele segue o padrão de design WAI-ARIA.</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-2">
								<Accordion.Trigger>É estilizado?</Accordion.Trigger>
								<Accordion.Content>Sim. Ele vem com estilos padrão que combinam com a estética dos outros componentes.</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-3">
								<Accordion.Trigger>É animado?</Accordion.Trigger>
								<Accordion.Content>Sim. É animado por padrão, mas você pode desativar se preferir.</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-semibold text-2xl">Avatar</h2>
					<div className="flex gap-4 rounded-lg border p-6">
						<Avatar.Root>
							<Avatar.Image src="https://github.com/MarcosLima-1.png" alt="@markin" />
							<Avatar.Fallback>ML</Avatar.Fallback>
							<Avatar.Badge />
						</Avatar.Root>
						<Avatar.Root>
							<Avatar.Fallback>ML</Avatar.Fallback>
						</Avatar.Root>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-semibold text-2xl">Button & Sonner (Toast)</h2>
					<div className="flex flex-wrap items-center gap-4 rounded-lg border p-6">
						<Button>Padrão</Button>
						<Button
							onClick={() =>
								toast.success("Evento criado com sucesso!", {
									description: "Domingo, 3 de Dezembro de 2023 às 9:00 AM",
									action: {
										label: "Desfazer",
										onClick: () => console.log("Desfeito"),
									},
								})
							}
						>
							Mostrar Toast de Sucesso
						</Button>
						<Button variant="destructive" onClick={() => toast.error("Falha ao criar evento.")}>
							Mostrar Toast de Erro
						</Button>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-semibold text-2xl">Dropdown Menu</h2>
					<div className="rounded-lg border p-6">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>Abrir menu</DropdownMenu.Trigger>
							<DropdownMenu.Content className="w-56">
								<DropdownMenu.Group>
									<DropdownMenu.GroupLabel>Configurações</DropdownMenu.GroupLabel>
									<DropdownMenu.Separator />
									<DropdownMenu.Item>
										<UserIcon />
										Perfil
									</DropdownMenu.Item>
									<DropdownMenu.Item>Cobrança</DropdownMenu.Item>
									<DropdownMenu.Item>Time</DropdownMenu.Item>
									<DropdownMenu.Item disabled>Inscrição</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-semibold text-2xl">Input</h2>
					<div className="grid w-full max-w-sm items-center gap-4 rounded-lg border p-6">
						<Input type="number" max={100} placeholder="Número (padrão)" />
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-semibold text-2xl">Input OTP</h2>
					<div className="rounded-lg border p-6">
						<InputOTP.Root maxLength={6}>
							<InputOTP.Group>
								<InputOTP.Slot index={0} />
								<InputOTP.Slot index={1} />
								<InputOTP.Slot index={2} />
							</InputOTP.Group>
							<InputOTP.Separator />
							<InputOTP.Group>
								<InputOTP.Slot index={3} />
								<InputOTP.Slot index={4} />
								<InputOTP.Slot index={5} />
							</InputOTP.Group>
						</InputOTP.Root>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-semibold text-2xl">Select</h2>
					<div className="rounded-lg border p-6">
						<Select.Root>
							<Select.Trigger className="w-45">
								<Select.Value placeholder="Selecione uma fruta" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Frutas</Select.Label>
									<Select.Item value="apple">Maçã</Select.Item>
									<Select.Item value="banana">Banana</Select.Item>
									<Select.Item value="blueberry">Mirtilo</Select.Item>
									<Select.Item value="grapes">Uvas</Select.Item>
									<Select.Item value="pineapple">Abacaxi</Select.Item>
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-semibold text-2xl">Textarea</h2>
					<div className="rounded-lg border p-6">
						<Textarea placeholder="Digite sua mensagem aqui." className="max-w-md" />
					</div>
				</section>
			</div>
		</div>
	);
}
