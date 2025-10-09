import { createFileRoute } from "@tanstack/react-router";
import { ChangePasswordForm } from "@/modules/auth/components/change-password-form";

export const Route = createFileRoute("/auth/change-password/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-svh-no-header w-full flex-col items-center justify-center gap-6">
			<div className="space-y-2 text-center">
				<h1 className="font-bold text-3xl">Vamos mudar a sua senha!!</h1>
				<p className="text-muted-foreground">Só precisamos fazer umas coisinhas antes.</p>
			</div>
			<div className="w-full max-w-sm">
				<ChangePasswordForm />
			</div>
		</div>
	);
}
