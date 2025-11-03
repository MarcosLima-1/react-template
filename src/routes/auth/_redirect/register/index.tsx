import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { EmailVerificationForm } from "@/modules/auth/components/email-verification-form";
import { OauthProviders } from "@/modules/auth/components/oauth-providers";
import { RegisterForm } from "@/modules/auth/components/register-form";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { getStorageTempMail } from "@/modules/auth/storage/temp-mail";

export const Route = createFileRoute("/auth/_redirect/register/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { currentStep } = useFormStepContext();
	const tempMail = getStorageTempMail();

	return (
		<div className="h-svh-no-header w-full">
			<div className="flex size-full flex-col items-center justify-center gap-6 border-r px-4 sm:max-w-md">
				<h1 className="font-bold text-2xl">Crie usa conta!</h1>
				{currentStep === 1 && <RegisterForm />}
				{currentStep === 2 && <EmailVerificationForm email={tempMail} purpose="EMAIL_VERIFICATION" />}
				<Button variant="link" className="text-xs" asChild>
					<Link to="/auth/login">
						Já tem uma conta?<span className="text-primary">Entre agora!</span>
					</Link>
				</Button>
				<div className="h-0.5 w-[90%] bg-accent" />
				<OauthProviders />
			</div>
			<div className="max-sm:hidden" />
		</div>
	);
}
