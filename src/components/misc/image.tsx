import { ImageOffIcon, RotateCwIcon } from "lucide-react";
import { type ComponentProps, useState } from "react";
import { cn } from "tailwind-variants";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ImageTypes } from "@/types/images-types.generated";

interface ImageProps extends ComponentProps<"img"> {
	src: ImageTypes | (string & {});
	priority?: boolean;
}

const urlSchema = z.url();

export function Image({ alt, height, className, priority = false, src, width, ...props }: ImageProps) {
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const isUrl = urlSchema.safeParse(src).success;
	const isLocalImage = src.startsWith("/");
	const imageSrc = isUrl ? src : `/images${src}`;

	if (!isUrl && !isLocalImage) {
		return (
			<div className="flex h-full flex-1 items-center justify-center">
				<Card.Root className="mx-auto w-fit max-w-sm">
					<Card.Content className="flex items-center gap-3 p-4">
						<ImageOffIcon className="size-5 text-muted-foreground" />
						<p className="text-muted-foreground text-sm">Link da imagem inválido</p>
					</Card.Content>
				</Card.Root>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex h-full flex-1 items-center justify-center">
				<Card.Root className="mx-auto w-fit max-w-sm">
					<Card.Content className="flex items-center gap-3 p-4">
						<ImageOffIcon className="size-5 text-destructive" />
						<p className="text-muted-foreground text-sm">Erro ao carregar a imagem!</p>
						<Button
							variant="ghost"
							size="icon"
							title="Tentar novamente"
							onClick={() => {
								setError(false);
								setIsLoading(true);
							}}
						>
							<RotateCwIcon />
						</Button>
					</Card.Content>
				</Card.Root>
			</div>
		);
	}

	return (
		<img
			src={imageSrc}
			alt={alt}
			width={width}
			height={height}
			draggable={false}
			className={cn(
				{
					"blur-xl": isLoading,
				},
				className,
			)}
			onLoad={() => setIsLoading(false)}
			loading={priority ? "eager" : "lazy"}
			fetchPriority={priority ? "high" : "low"}
			decoding="async"
			onError={() => setError(true)}
			{...props}
		/>
	);
}
