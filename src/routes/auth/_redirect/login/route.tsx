import { createFileRoute, Outlet } from "@tanstack/react-router";
import { loginSteps } from "@/modules/auth/constants/steps";
import { StepFormProvider } from "@/modules/auth/context/step-form-context";

export const Route = createFileRoute("/auth/_redirect/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<StepFormProvider steps={loginSteps}>
			<Outlet />
		</StepFormProvider>
	)
}
