import { LockIcon, MailIcon } from "lucide-react";
import type { StepItem } from "@/modules/auth/context/step-form-context";

export const registerSteps: StepItem[] = [
	{
		icon: LockIcon,
		label: "Register",
		hideOnProgressBar: true,
	},
	{
		icon: MailIcon,
		label: "Verificação de email",
		hideOnProgressBar: true,
	},
];

export const loginSteps: StepItem[] = [
	{
		icon: LockIcon,
		label: "Login",
		hideOnProgressBar: true,
	},
	{
		icon: MailIcon,
		label: "Verificação de email",
		hideOnProgressBar: true,
	},
];

export const changePasswordSteps: StepItem[] = [
	{
		icon: LockIcon,
		label: "email",
	},
	{
		icon: MailIcon,
		label: "Verificação",
	},
	{
		icon: MailIcon,
		label: "Troca de senha",
	},
];
