import { Eye, EyeClosed } from "lucide-react";
import { type ComponentProps, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useFieldContext } from "../app-form.tsx";

export function PasswordField({ ...props }: ComponentProps<"input">) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const field = useFieldContext<string>();

	function handleTogglePasswordVisibility() {
		setIsPasswordVisible(!isPasswordVisible);
	}

	return (
		<div className="flex">
			<Input
				id={field.name}
				onChange={(e) => field.handleChange(e.target.value)}
				value={field.state.value}
				onBlur={field.handleBlur}
				name={field.name}
				autoComplete="current-password"
				type={isPasswordVisible ? "text" : "password"}
				className="rounded-r-none"
				placeholder="******"
				{...props}
			/>
			<Button onClick={handleTogglePasswordVisibility} type="button" variant="outline" className="bg-input rounded-l-none">
				{isPasswordVisible ? <Eye /> : <EyeClosed />}
			</Button>
		</div>
	);
}
