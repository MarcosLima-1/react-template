import { AlertTriangleIcon } from "lucide-react";

interface ErrorDisplayProps {
	error: Error;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
	return (
		<div className="flex h-svh min-h-96 w-full flex-col items-center justify-center gap-4 p-8 text-center text-white">
			<AlertTriangleIcon className="size-16 text-red-500" />
			<h1 className="text-3xl font-bold">Ocorreu um Erro</h1>
			<p className="text-gray-400">Algo inesperado aconteceu. Por favor, tente novamente mais tarde.</p>

			<pre className="mt-4 w-full max-w-lg overflow-x-auto rounded-lg border border-red-500/20 bg-gray-900 p-4 text-left text-sm text-red-300">
				{error.message}
			</pre>
		</div>
	);
}
