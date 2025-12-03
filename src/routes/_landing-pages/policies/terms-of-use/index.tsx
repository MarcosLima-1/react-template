import { createFileRoute } from "@tanstack/react-router";
import { LandingPageContainer } from "@/components/misc/landing-page-container";
import { LandingSection } from "@/components/misc/landing-section";
import { TermosOfUseText } from "@/modules/landing-pages/pages/policies/components/termos-of-use-text";

export const Route = createFileRoute("/_landing-pages/policies/terms-of-use/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LandingPageContainer>
			<LandingSection className="items-start">
				<TermosOfUseText />
			</LandingSection>
		</LandingPageContainer>
	);
}
