import { Avatar as AvatarBaseUi, type AvatarRootProps } from "@base-ui/react/avatar";
import type { LucideIcon } from "lucide-react";
import { cn } from "tailwind-variants";

interface AvatarProps extends AvatarRootProps {
	fallBackIcon: LucideIcon;
	src?: string;
	alt: string;
}

export function Avatar({ fallBackIcon: FallBackIcon, src, alt, className, ...props }: AvatarProps) {
	return (
		<AvatarBaseUi.Root
			className={cn(
				"inline-flex size-12 select-none items-center justify-center overflow-hidden rounded-full bg-gray-100 align-middle font-medium text-base text-black",
				className,
			)}
			{...props}
		>
			<AvatarBaseUi.Image src={src} alt={alt} className="size-full object-cover" />
			<AvatarBaseUi.Fallback>
				<FallBackIcon />
			</AvatarBaseUi.Fallback>
		</AvatarBaseUi.Root>
	);
}
