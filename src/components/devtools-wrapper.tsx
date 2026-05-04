import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

/**
 * DevTools wrapper component
 * This component is responsible for rendering the TanStack DevTools panels for React Query, React Router, and React Form. It is designed to be included in the root of the application, allowing developers to easily access debugging tools during development. The DevTools will be removed from the production build to optimize performance and security.
 */
export function DevtoolsWrapper() {
	return (
		<TanStackDevtools
			config={{
				position: "bottom-right",
				panelLocation: "bottom",
				defaultOpen: false,
			}}
			plugins={[
				{
					name: "Tanstack Query",
					render: <ReactQueryDevtoolsPanel />,
				},
				{
					name: "Tanstack Router",
					render: <TanStackRouterDevtoolsPanel />,
				},
				{
					name: "TanStack Form",
					render: <FormDevtoolsPanel />,
				},
			]}
		/>
	);
}
