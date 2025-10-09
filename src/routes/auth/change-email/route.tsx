import { createFileRoute, Outlet } from "@tanstack/react-router";
import { changePasswordSteps } from "@/modules/auth/constants/steps";
import { StepFormProvider } from "@/modules/auth/context/step-form-context";

export const Route = createFileRoute("/auth/change-email")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<StepFormProvider steps={changePasswordSteps}>
			<Outlet />
		</StepFormProvider>
	)
}
