import ReactMarkdown from "react-markdown";
import { customMarkdownComponents } from "@/lib/react-markdown";

export function TermosOfUseText() {
	return <ReactMarkdown components={customMarkdownComponents}>{text}</ReactMarkdown>;
}

const text = `Coloque os termos aqui!`;
