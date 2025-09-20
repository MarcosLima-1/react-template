import { useEffect, useState } from "react";

const breakpoints = {
	xs: 475,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
};

interface CurrentBreakpoint {
	/** Retorna `true` se o dispositivo é provavelmente um celular ou tablet. */
	isMobileDevice: boolean;
	/** Retorna `true` se a LARGURA da tela está abaixo do breakpoint 'lg' (1024px). */
	isMobileLayout: boolean;
}

/**
 * Função auxiliar para detectar um dispositivo móvel (celular/tablet).
 * Combina a verificação do User Agent com a detecção de capacidade de toque.
 */
const detectMobileDevice = (): boolean => {
	const userAgentCheck = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
	const touchCheck = "ontouchstart" in window || navigator.maxTouchPoints > 0;

	return userAgentCheck || touchCheck;
};

export function useIsMobile(): CurrentBreakpoint {
	const [breakpointInfo, setBreakpointInfo] = useState<CurrentBreakpoint>({
		isMobileDevice: detectMobileDevice(),
		isMobileLayout: typeof window !== "undefined" ? window.innerWidth <= breakpoints.lg : false,
	});

	useEffect(() => {
		const calculateLayout = () => {
			const width = window.innerWidth;
			setBreakpointInfo((currentInfo) => ({
				...currentInfo,
				isMobileLayout: width <= breakpoints.lg,
			}));
		};

		calculateLayout();

		window.addEventListener("resize", calculateLayout);
		return () => window.removeEventListener("resize", calculateLayout);
	}, []);

	return breakpointInfo;
}
