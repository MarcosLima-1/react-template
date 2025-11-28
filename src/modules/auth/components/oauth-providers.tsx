import { useGoogleLogin } from "@react-oauth/google";
import { ChromeIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { useMutationLoginGoogle } from "@/modules/auth/api/login-google";
import { signIn } from "@/modules/auth/utils/auth";

export function OauthProviders() {
	const { mutateAsync: loginGoogle } = useMutationLoginGoogle();

	const loginWithGoogle = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			const { data } = await loginGoogle({ token: tokenResponse.access_token });
			const { accessToken, user } = data;

			signIn({ accessToken, session: { user } });
		},
	});

	return (
		<div className="flex flex-wrap items-center">
			<Button onClick={() => loginWithGoogle()} variant="outline" className="rounded-md">
				<ChromeIcon /> Login com o Google
			</Button>
		</div>
	);
}
