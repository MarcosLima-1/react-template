import { createFileRoute, Outlet } from "@tanstack/react-router";
import { registerSteps } from "@/modules/auth/constants/steps";
import { StepFormProvider } from "@/modules/auth/context/step-form-context";

export const Route = createFileRoute("/auth/_redirect/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<StepFormProvider steps={registerSteps}>
			<Outlet />
		</StepFormProvider>
	)
}
