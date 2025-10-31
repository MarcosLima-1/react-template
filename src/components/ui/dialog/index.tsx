import { DialogOverlay } from "@/components/ui/dialog/components/control/overlay";
import { Portal } from "@/components/ui/dialog/components/control/portal";
import { Provider } from "@/components/ui/dialog/components/control/provider";
import { DialogTrigger } from "@/components/ui/dialog/components/control/trigger";
import { DialogCloseButton } from "@/components/ui/dialog/components/presentation/close-button";
import { DialogContent } from "@/components/ui/dialog/components/presentation/content";
import { Description } from "@/components/ui/dialog/components/presentation/description";
import { Footer } from "@/components/ui/dialog/components/presentation/footer";
import { Header } from "@/components/ui/dialog/components/presentation/header";
import { Title } from "@/components/ui/dialog/components/presentation/title";
import { BasicDialog } from "@/components/ui/dialog/components/preset/basic";
import { ConfimationDialog } from "@/components/ui/dialog/components/preset/confimation-dialog";

export const Dialog = {
	provider: Provider,
	portal: Portal,
	overlay: DialogOverlay,
	content: DialogContent,
	trigger: DialogTrigger,
	close: DialogCloseButton,
	title: Title,
	description: Description,
	header: Header,
	footer: Footer,
	presets: {
		basic: BasicDialog,
		confirm: ConfimationDialog,
	},
};
