import { createFileRoute, Outlet } from "@tanstack/react-router";
import { StepFormProvider } from "@/modules/auth/context/step-form-context";
import { changePasswordSteps } from "@/modules/auth/core/steps";

export const Route = createFileRoute("/auth/change-password")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<StepFormProvider steps={changePasswordSteps}>
			<Outlet />
		</StepFormProvider>
	);
}
