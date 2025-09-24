import { AlertTriangleIcon } from "lucide-react";

interface GenericErrorProps {
	error: Error;
}

export function GenericError({ error }: GenericErrorProps) {
	return (
		<div className="flex h-svh min-h-96 w-full flex-col items-center justify-center gap-4 p-8 text-center">
			<AlertTriangleIcon className="size-16 text-destructive" />
			<h1 className="font-bold text-3xl">Ocorreu um Erro</h1>
			<p className="text-muted-foreground">Algo inesperado aconteceu. Por favor, tente novamente mais tarde.</p>

			<pre className="mt-4 w-full max-w-lg overflow-x-auto rounded-lg border border-red-500/20 bg-gray-900 p-4 text-left text-red-300 text-sm">
				{error.message}
			</pre>
		</div>
	);
}
