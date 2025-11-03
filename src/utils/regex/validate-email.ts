import z from "zod/v4";

export const validateEmail = z
	.email("E-mail inválido.")
	.trim()
	.toLowerCase()
	.refine((email) => {
		return ALLOWED_DOMAINS.some((domain) => email.endsWith(`@${domain}`));
	}, "Este domínio de email não é permitido.");

export const ALLOWED_DOMAINS = [
	"hotmail.com",
	"gmail.com",
	"outlook.com",
	"outlook.com.br",
	"protonmail.com",
	"proton.me",
	"protonmail.ch",
	"pm.me",
	"aol.com",
	"yahoo.com",
	"yahoo.com.br",
	"zohomail.com",
	"live.com",
	"msn.com",
	"office365.com",
	"googlemail.com",
	"icloud.com",
	"me.com",
	"mac.com",
	"ymail.com",
	"bol.com.br",
	"uol.com.br",
	"ig.com.br",
	"terra.com.br",
	"tutanota.com",
	"mailfence.com",
	"ufms.br",
	"deltacontab.com.br",
	"sapo.pt",
	"aluno.iecj.com.br",
	"teliy.co",
	"estudante.edusenaipa.com.br",
	"pulliginfluencers.com.br",
];
