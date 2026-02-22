import { useEffect, useRef, useState } from "react";
import type { Alert } from "@/modules/alert/types/alert";

export interface UseAlertQueueReturn {
	/** The alert currently displayed (first in queue), or `null` if the queue is empty. */
	current: Alert | null;
	/** Whether the dialog should be open (queue is non-empty). */
	isOpen: boolean;
	/** Dismiss the current alert and advance to the next one. */
	dismiss: () => void;
	/** Number of alerts still pending (including the current one). */
	remaining: number;
}

/**
 * Manages a queue of alerts, showing them one at a time.
 *
 * Alerts are identified by their `id`. Newly arriving alerts (not previously
 * seen) are appended to the queue automatically so the hook works with live
 * data coming from an API query.
 *
 * @example
 * const { current, isOpen, dismiss } = useAlertQueue(alerts);
 */
export function useAlertQueue(alerts: Alert[]): UseAlertQueueReturn {
	const [queue, setQueue] = useState<Alert[]>([]);
	/** Tracks which alert ids have already been enqueued to avoid duplicates. */
	const seenIds = useRef<Set<string>>(new Set());

	useEffect(() => {
		const newAlerts = alerts.filter((a) => !seenIds.current.has(a.id));
		if (newAlerts.length === 0) return;

		for (const a of newAlerts) {
			seenIds.current.add(a.id);
		}

		setQueue((prev) => [...prev, ...newAlerts]);
	}, [alerts]);

	const current = queue[0] ?? null;
	const isOpen = queue.length > 0;

	function dismiss() {
		setQueue((prev) => prev.slice(1));
	}

	return { current, isOpen, dismiss, remaining: queue.length };
}
