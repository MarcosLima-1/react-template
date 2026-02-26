/**
 * Alert types for the alert dialog system.
 *
 * Each alert variant is a discriminated union member.
 * Add new variants by extending the union and adding a handler in alert-dialog.tsx.
 *
 * @example
 * const alerts: Alert[] = [
 *   { id: "1", variant: "text", title: "Manutenção programada", content: "O sistema ficará **indisponível** às 02:00." },
 *   { id: "2", variant: "image", src: "/banner.png", alt: "Promoção" },
 *   { id: "3", variant: "text-image", title: "Novidade!", content: "Veja nossa nova funcionalidade.", src: "/feature.png" },
 * ];
 */

// ---------------------------------------------------------------------------
// Shared base
// ---------------------------------------------------------------------------

interface AlertBase {
	/** Unique identifier — used to deduplicate alerts shown in the same session. */
	id: string;
	/** Optional title rendered in the dialog header. */
	title?: string;
}

// ---------------------------------------------------------------------------
// Variant: text
// ---------------------------------------------------------------------------

export interface TextAlert extends AlertBase {
	variant: "text";
	/** Markdown-enabled body text of the alert. */
	content: string;
}

// ---------------------------------------------------------------------------
// Variant: image
// ---------------------------------------------------------------------------

export interface ImageAlert extends AlertBase {
	variant: "image";
	/** Image URL. */
	src: string;
	/** Accessible alt text. */
	alt?: string;
}

// ---------------------------------------------------------------------------
// Variant: text-image
// ---------------------------------------------------------------------------

export interface TextImageAlert extends AlertBase {
	variant: "text-image";
	/** Main body text of the alert. */
	content: string;
	/** Image URL displayed above the text. */
	src: string;
	/** Accessible alt text. */
	alt?: string;
}

// ---------------------------------------------------------------------------
// Union — add new variants here
// ---------------------------------------------------------------------------

export type Alert = TextAlert | ImageAlert | TextImageAlert;

/** All possible variant keys derived from the union. */
export type AlertVariant = Alert["variant"];
