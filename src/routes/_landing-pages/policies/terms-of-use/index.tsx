import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/ui/landing";
import { TermosOfUseText } from "@/modules/landing-pages/pages/policies/components/termos-of-use-text";

export const Route = createFileRoute("/_landing-pages/policies/terms-of-use/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Landing.Page>
			<Landing.Section>
				<Landing.Container className="flex-col">
					<TermosOfUseText />
				</Landing.Container>
			</Landing.Section>
		</Landing.Page>
	);
}
