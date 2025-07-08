import type { ImgHTMLAttributes } from "react";
import type { PublicPath } from "@/public-paths";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	alt: string;
	src: PublicPath | (string & {});
	width: number;
	height: number;
	priority?: boolean;
}

export function Image({ alt, height, priority = false, src, width, ...props }: ImageProps) {
	const isUrl = src.startsWith("http") || src.startsWith("blob");

	return (
		<img
			src={isUrl ? src : `/images${src}`}
			alt={alt}
			width={width}
			height={height}
			draggable={false}
			loading={priority ? "eager" : "lazy"}
			fetchPriority={priority ? "high" : "low"}
			decoding="async"
			{...props}
		/>
	);
}
