import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Field } from "@/modules/form/components/field";
import { useAppForm } from "@/modules/form/lib/app-form";
import { toast } from "@/modules/notification/components/toasts";

export const Route = createFileRoute("/examples/form/")({
	component: RouteComponent,
});

const formSchema = z.object({
	text: z.string().min(1, "Campo obrigatório"),
	textarea: z.string().optional(),
	password: z.string().min(6, "Mínimo 6 caracteres"),
	confirmCode: z.string().length(6, "Código deve ter 6 dígitos"),
	number: z.number().min(0, "Deve ser positivo"),
	cents: z.number().min(0, "Deve ser positivo"),
	select: z.string().min(1, "Selecione uma opção"),
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
	const defaultValues: FormValues = {
		text: "",
		textarea: "",
		password: "",
		confirmCode: "",
		number: 0,
		cents: 0,
		select: "",
	};

	const form = useAppForm({
		validators: {
			onChange: formSchema,
			onSubmit: formSchema,
			onMount: formSchema,
		},
		defaultValues,
		onSubmit: async ({ value }) => {
			toast.success({
				title: "Formulário enviado!",
				description: JSON.stringify(value, null, 2),
			});
		},
	});

	return (
		<div className="container mx-auto max-w-2xl py-10">
			<div className="space-y-6">
				<div>
					<h1 className="font-bold text-3xl">Formulário de Exemplo</h1>
					<p className="text-muted-foreground">Demonstração dos componentes de formulário reutilizáveis.</p>
				</div>

				<Card.Root className="p-6">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-8"
					>
						<div className="space-y-4">
							<form.AppField
								name="text"
								children={(field) => (
									<Field.Wrapper>
										<Field.Label>Text Field</Field.Label>
										<field.TextField placeholder="Digite um texto simples" />
										<Field.Error />
									</Field.Wrapper>
								)}
							/>

							<form.AppField
								name="textarea"
								children={(field) => (
									<Field.Wrapper>
										<Field.Label>Textarea Field</Field.Label>
										<field.TextareaField placeholder="Digite um texto longo" />
										<Field.Error />
									</Field.Wrapper>
								)}
							/>

							<form.AppField
								name="password"
								children={(field) => (
									<Field.Wrapper>
										<Field.Label>Password Field</Field.Label>
										<field.PasswordField placeholder="Digite sua senha" />
										<Field.Error />
									</Field.Wrapper>
								)}
							/>

							<form.AppField
								name="confirmCode"
								children={(field) => (
									<Field.Wrapper>
										<Field.Label>Confirm Code Field</Field.Label>
										<field.ConfirmCodeField />
										<Field.Error />
									</Field.Wrapper>
								)}
							/>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<form.AppField
									name="number"
									children={(field) => (
										<Field.Wrapper>
											<Field.Label>Number Field</Field.Label>
											<field.NumberField placeholder="0" />
											<Field.Error />
										</Field.Wrapper>
									)}
								/>

								<form.AppField
									name="cents"
									children={(field) => (
										<Field.Wrapper>
											<Field.Label>Cents Field (Currency)</Field.Label>
											<field.CentsField placeholder="R$ 0,00" />
											<Field.Error />
										</Field.Wrapper>
									)}
								/>
							</div>

							<form.AppField
								name="select"
								children={(field) => (
									<Field.Wrapper>
										<Field.Label>Select Field</Field.Label>
										<field.SelectField
											placeholder="Selecione uma opção"
											options={[
												{ value: "option1", label: "Opção 1" },
												{ value: "option2", label: "Opção 2" },
											]}
										/>
										<Field.Error />
									</Field.Wrapper>
								)}
							/>
						</div>

						<div className="flex justify-end">
							<form.AppForm>
								<form.SubmitButton className="w-full md:w-auto">Enviar Formulário</form.SubmitButton>
							</form.AppForm>
						</div>
					</form>
				</Card.Root>
			</div>
		</div>
	);
}
