import { createFileRoute, Outlet } from "@tanstack/react-router";
import { StepFormProvider } from "@/modules/auth/context/step-form-context";
import { loginSteps } from "@/modules/auth/core/steps";

export const Route = createFileRoute("/auth/_redirect/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<StepFormProvider steps={loginSteps}>
			<Outlet />
		</StepFormProvider>
	);
}
