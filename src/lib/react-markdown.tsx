import type { JSX, ReactNode } from "react";

type CustomMarkdownComponents = Record<string, ({ children }: { children: ReactNode }) => JSX.Element>;

export const customMarkdownComponents: CustomMarkdownComponents = {
	h1: ({ children }) => <h1 className="mb-4 font-bold text-3xl">{children}</h1>,
	h2: ({ children }) => <h2 className="mb-3 font-bold text-2xl">{children}</h2>,
	h3: ({ children }) => <h3 className="mb-2 font-bold text-xl">{children}</h3>,
	h4: ({ children }) => <h4 className="mb-2 font-bold text-lg">{children}</h4>,
	h5: ({ children }) => <h5 className="mb-1 font-bold text-base">{children}</h5>,
	h6: ({ children }) => <h6 className="mb-1 font-bold text-sm">{children}</h6>,
	p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
	ul: ({ children }) => <ul className="mb-4 list-disc pl-5">{children}</ul>,
	li: ({ children }) => <li className="mb-2">{children}</li>,
	hr: () => <hr className="my-4 h-4 border-muted-foreground" />,
};
