import { GenericError } from "@/components/generic-error";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// biome-ignore lint/suspicious/noConsole: Console log for errors
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError && this.state.error) {
			return (
				this.props.fallback || (
					<GenericError
						error={this.state.error}
					/>
				)
			);
		}

		return this.props.children;
	}
}
