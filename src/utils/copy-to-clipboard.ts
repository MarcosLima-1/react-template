import { toast } from "@/modules/notification/components/toasts";

interface CopyToClipboardProps {
	value: string;
	message: string;
}

export function copyToClipboard({ value, message }: CopyToClipboardProps) {
	navigator.clipboard.writeText(value);
	toast.success({ title: "Valor Copiado!", description: message });
}
