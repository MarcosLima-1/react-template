import type { LucideIcon } from "lucide-react";
import { createContext, type ReactNode, use, useState } from "react";

export interface StepItem {
	icon: LucideIcon;
	label: string;
	hideOnProgressBar?: boolean;
}

interface StepFormContextProps {
	nextStep: () => void;
	backStep: () => void;
	goToStep: (step: number) => void;
	totalVisualSteps: number;
	steps: StepItem[];
	currentStep: number;
	totalSteps: number;
	isFirstStep: boolean;
	isLastVisualStep: boolean;
	isLastStep: boolean;
}

const StepFormContext = createContext<StepFormContextProps | null>(null);

interface StepFormProviderProps {
	children: ReactNode;
	steps: StepItem[];
}

export function StepFormProvider({ steps, children }: StepFormProviderProps) {
	const [currentStep, setCurrentStep] = useState<number>(1);
	const totalVisualSteps = steps.filter(({ hideOnProgressBar }) => !hideOnProgressBar).length;
	const totalSteps = steps.length;
	const isFirstStep = currentStep === 1;
	const isLastVisualStep = currentStep === totalVisualSteps;
	const isLastStep = currentStep === totalSteps;

	function nextStep() {
		if (isLastStep) return;
		setCurrentStep((prev) => prev + 1);
	}

	function backStep() {
		if (isFirstStep) return;
		setCurrentStep((prev) => prev - 1);
	}

	function goToStep(step: number) {
		if (step > totalSteps || step < 1) return;
		setCurrentStep(step);
	}

	const values: StepFormContextProps = {
		currentStep,
		totalSteps,
		totalVisualSteps,
		isLastVisualStep,
		isFirstStep,
		isLastStep,
		steps,
		nextStep,
		backStep,
		goToStep,
	};

	return <StepFormContext value={values}>{children}</StepFormContext>;
}

export function useFormStepContext() {
	const context = use(StepFormContext);
	if (!context) {
		throw new Error("useFormStepContext deve ser usado dentro de um StepFormProvider");
	}
	return context;
}
