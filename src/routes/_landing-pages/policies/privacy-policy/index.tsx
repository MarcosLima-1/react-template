import { createFileRoute } from "@tanstack/react-router";
import { LandingPageContainer } from "@/components/misc/landing-page-container";
import { LandingSection } from "@/components/misc/landing-section";
import { PrivacyPolicyText } from "@/modules/landing-pages/pages/policies/components/privacy-policy-text";

export const Route = createFileRoute("/_landing-pages/policies/privacy-policy/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LandingPageContainer>
			<LandingSection className="items-start">
				<PrivacyPolicyText />
			</LandingSection>
		</LandingPageContainer>
	);
}
