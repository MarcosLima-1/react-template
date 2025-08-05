import { EyeClosedIcon, EyeIcon } from "lucide-react";
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
		<div className="flex rounded-md border focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
			<Input
				id={field.name}
				onChange={(e) => field.handleChange(e.target.value)}
				value={field.state.value}
				onBlur={field.handleBlur}
				name={field.name}
				autoComplete="current-password"
				type={isPasswordVisible ? "text" : "password"}
				className="rounded-r-none border-none focus-visible:ring-0"
				placeholder="******"
				{...props}
			/>
			<Button onClick={handleTogglePasswordVisibility} type="button" variant="outline" className="rounded-l-none bg-input">
				{isPasswordVisible ? <EyeIcon /> : <EyeClosedIcon />}
			</Button>
		</div>
	);
}
