import { createFileRoute, Outlet } from "@tanstack/react-router";
import { StepFormProvider } from "@/modules/auth/context/step-form-context";
import { registerSteps } from "@/modules/auth/core/steps";

export const Route = createFileRoute("/auth/_redirect/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<StepFormProvider steps={registerSteps}>
			<Outlet />
		</StepFormProvider>
	);
}
