import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { customMarkdownComponents } from "@/lib/react-markdown";
import { useAlertQueue } from "@/modules/alert/hooks/use-alert-queue";
import type { Alert, AlertVariant, ImageAlert, TextAlert, TextImageAlert } from "@/modules/alert/types/alert";

// ---------------------------------------------------------------------------
// Per-variant content renderers
// Extend this map to support new Alert variants without touching the dialog.
// ---------------------------------------------------------------------------

type AlertRenderers = {
	[V in AlertVariant]: (alert: Extract<Alert, { variant: V }>) => React.ReactNode;
};

const alertRenderers: AlertRenderers = {
	image: (alert: ImageAlert) => <img src={alert.src} alt={alert.alt ?? ""} className="w-full rounded-lg object-cover" />,
	"text-image": (alert: TextImageAlert) => (
		<div className="space-y-3">
			<img src={alert.src} alt={alert.alt ?? ""} className="h-auto w-full rounded-lg object-contain" />
			<ReactMarkdown components={customMarkdownComponents}>{alert.content}</ReactMarkdown>
		</div>
	),
	text: (alert: TextAlert) => <ReactMarkdown components={customMarkdownComponents}>{alert.content}</ReactMarkdown>,
};

function renderAlertContent(alert: Alert): React.ReactNode {
	// Cast is safe — the renderer key matches the discriminant
	const renderer = alertRenderers[alert.variant] as (a: Alert) => React.ReactNode;
	return renderer(alert);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface AlertDialogProps {
	/**
	 * Array of alerts to display in sequence.
	 * New items added to the array after mount are automatically enqueued.
	 */
	alerts: Alert[];
}

/**
 * Shows alerts one at a time in a dialog.
 * When one alert is dismissed the next queued alert is shown automatically.
 *
 * @example
 * <AlertDialog alerts={alertsFromApi} />
 */
export function AlertDialog({ alerts }: AlertDialogProps) {
	const { current, isOpen, dismiss, remaining } = useAlertQueue(alerts);

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) dismiss();
			}}
		>
			<Dialog.Content showCloseButton={false} className="max-h-[80vh] sm:max-w-3xl">
				{current && (
					<>
						<div className="max-h-[70vh] overflow-y-scroll">
							{current.title && (
								<Dialog.Header>
									<Dialog.Title>{current.title}</Dialog.Title>
								</Dialog.Header>
							)}
							<div className={current.title ? "px-4 pb-4" : "p-4"}>{renderAlertContent(current)}</div>
						</div>

						<Dialog.Footer>
							<Dialog.Close
								render={
									<Button>{remaining > 1 ? `Continuar (${remaining - 1} restante${remaining - 1 > 1 ? "s" : ""})` : "Fechar"}</Button>
								}
							/>
						</Dialog.Footer>
					</>
				)}
			</Dialog.Content>
		</Dialog.Root>
	);
}
