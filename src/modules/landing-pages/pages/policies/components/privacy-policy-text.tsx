import ReactMarkdown from "react-markdown";
import { customMarkdownComponents } from "@/lib/react-markdown";

export function PrivacyPolicyText() {
	return <ReactMarkdown components={customMarkdownComponents}>{text}</ReactMarkdown>;
}

const text = `Coloque as politicas aqui!`;
