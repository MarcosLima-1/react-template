import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/ui/landing";
import { PrivacyPolicyText } from "@/modules/landing-pages/pages/policies/components/privacy-policy-text";

export const Route = createFileRoute("/_landing-pages/policies/privacy-policy/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Landing.Page>
			<Landing.Container className="items-start">
				<PrivacyPolicyText />
			</Landing.Container>
		</Landing.Page>
	);
}
