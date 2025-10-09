import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { cn } from "@/utils/cn";

export function FormProgressBar() {
	const { currentStep, steps, totalVisualSteps } = useFormStepContext();
	const progressPercentage = (currentStep / totalVisualSteps) * 100;
	return (
		<div className="relative flex w-[300px] items-center justify-around overflow-hidden">
			{steps
				.filter(({ hideOnProgressBar }) => !hideOnProgressBar)
				.map(({ icon: Icon, label }, index) => {
					const currentStepBall = index + 1;
					return (
						<div key={label} className="z-10 flex flex-1 flex-col items-center gap-2">
							<div
								className={cn(
									"flex size-8 items-center justify-center rounded-full border-2 border-accent bg-background text-foreground transition-colors",
									{
										"border-primary text-primary": currentStepBall <= currentStep,
									},
								)}
							>
								<Icon className="size-4" />
							</div>
							<p className="text-muted-foreground text-xs">{label}</p>
						</div>
					);
				})}
			<div className="-translate-y-1/2 absolute top-4 left-0 h-1 w-full rounded-full bg-accent">
				<div style={{ width: `${progressPercentage}%` }} className="h-full max-w-full rounded-full bg-primary transition-all" />
			</div>
		</div>
	);
}
