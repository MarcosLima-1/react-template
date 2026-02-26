import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { type ComponentProps, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/modules/form/context/app-form-context";

export function PasswordField({ ...props }: ComponentProps<"input">) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const field = useFieldContext<string>();

	function togglePasswordVisibility() {
		setIsPasswordVisible(!isPasswordVisible);
	}

	return (
		<div className="flex rounded-md">
			<Input
				autoComplete="current-password"
				className="h-auto rounded-r-none border focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50"
				id={field.name}
				name={field.name}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				placeholder="******"
				type={isPasswordVisible ? "text" : "password"}
				value={field.state.value}
				{...props}
			/>
			<Button className="rounded-l-none bg-input" onClick={togglePasswordVisibility} type="button" variant="outline">
				{isPasswordVisible ? <EyeIcon /> : <EyeClosedIcon />}
			</Button>
		</div>
	);
}
