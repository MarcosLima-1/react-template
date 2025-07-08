import { toast } from "sonner";

interface CopyToClipboardProps {
	value: string;
	message: string;
}

export function copyToClipboard({ value, message }: CopyToClipboardProps) {
	navigator.clipboard.writeText(value);
	toast.success(message);
}
