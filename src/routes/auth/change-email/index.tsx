import { createFileRoute } from "@tanstack/react-router";
import { ChangeEmailForm } from "@/modules/auth/components/change-email-form";

export const Route = createFileRoute("/auth/change-email/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-svh-no-header w-full flex-col items-center justify-center gap-6">
			<div className="space-y-2 text-center">
				<h1 className="font-bold text-3xl">Vamos mudar a seu email!!</h1>
				<p className="text-muted-foreground">Só precisamos fazer umas coisinhas antes.</p>
			</div>
			<div className="w-full max-w-sm">
				<ChangeEmailForm />
			</div>
		</div>
	);
}
