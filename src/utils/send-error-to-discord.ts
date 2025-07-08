import axios from "axios";

interface SendApplicationErrorToDiscordRequest {
	error: Error;
	webhookUrl: string;
	context?: Record<string, unknown>;
}

export const sendApplicationErrorToDiscord = async ({ error, webhookUrl, context }: SendApplicationErrorToDiscordRequest) => {
	const errorMessage = error.message || "An unknown error occurred.";
	const errorStack = error.stack || "No stack trace available.";

	const messageData = {
		content: null,
		embeds: [
			{
				title: "**🚨 Application Error!**",
				description: `An unexpected error occurred in the application.`,
				color: 15548997,
				fields: [
					{
						name: "📝 Error Message",
						value: `\`\`\`\n${errorMessage}\n\`\`\``,
						inline: false,
					},
					{
						name: "📜 Stack Trace",
						value: `\`\`\`\n${errorStack.substring(0, 1000)}\n\`\`\``,
						inline: false,
					},
				],
				timestamp: new Date().toISOString(),
				footer: {
					text: `Application Monitoring | Error Report`,
				},
			},
		],
	};

	if (context) {
		for (const key in context) {
			messageData.embeds[0].fields.push({
				name: `ℹ️ ${key.charAt(0).toUpperCase() + key.slice(1)}`,
				value: `\`\`\`\n${JSON.stringify(context[key], null, 2).substring(0, 1000)}\n\`\`\``,
				inline: false,
			});
		}
	}

	try {
		await axios.post(webhookUrl, messageData);
	} catch (discordError) {
		// biome-ignore lint/suspicious/noConsole: So pra saber se deu erro
		console.error("Failed to send error message to Discord:", discordError);
	}
};
