import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { EmailVerificationForm } from "@/modules/auth/components/email-verification-form";
import { LoginForm } from "@/modules/auth/components/login-form";
import { OauthProviders } from "@/modules/auth/components/oauth-providers";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { getStorageTempMail } from "@/modules/auth/storage/temp-mail";

export const Route = createFileRoute("/auth/_redirect/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { currentStep } = useFormStepContext();
	const tempMail = getStorageTempMail();

	return (
		<div className="h-svh-no-header w-full">
			<div className="flex size-full max-w-md flex-col items-center justify-center gap-6 border-r px-4">
				<h1 className="font-bold text-2xl">Bem vindo de volta!</h1>
				{currentStep === 1 && <LoginForm />}
				{currentStep === 2 && <EmailVerificationForm email={tempMail} purpose="EMAIL_VERIFICATION" />}
				<Button variant="link" className="text-xs" asChild>
					<Link to="/auth/register">
						Ainda não tem uma conta? <span className="text-primary">Cadastre-se</span>
					</Link>
				</Button>
				<div className="h-0.5 w-[90%] bg-accent" />
				<OauthProviders />
				<Button variant="link" className="text-xs" asChild>
					<Link to="/auth/change-password">
						Esqueceu sua senha? <span className="text-primary">clique aqui</span>
					</Link>
				</Button>
			</div>
			<div className="max-md:hidden" />
		</div>
	);
}
