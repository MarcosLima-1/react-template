/** biome-ignore-all lint/suspicious/noConsole: usado para mostrar o progresso de otimização no console  */

import { exec } from "node:child_process";
import { readdir, stat, unlink } from "node:fs/promises";
import { basename, dirname, extname, join, relative } from "node:path";
import { promisify } from "node:util";
import { beautifyBytes } from "../src/utils/formatters/beautify-bytes";

const execAsync = promisify(exec);

const IMAGES_DIR = join(process.cwd(), "public", "images");
const FFMPEG_QUALITY = 50; // Qualidade WebP (0-100, onde 100 é a melhor)
const MAX_HEIGHT = 720; // Resolução máxima (altura)
const SUPPORTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".bmp", ".tiff"];

/**
 * Interface para armazenar o resultado de cada processamento
 */
interface ProcessResult {
	file: string;
	status: "Converted" | "Skipped" | "Error";
	originalSizeBytes: number;
	newSizeBytes: number;
	error?: string;
}

/**
 * Processa uma única imagem com o FFmpeg.
 */
async function processImage(imagePath: string): Promise<ProcessResult> {
	const fileExt = extname(imagePath);
	const fileName = basename(imagePath, fileExt);
	const fileDir = dirname(imagePath);
	const relativePath = relative(IMAGES_DIR, imagePath); // Caminho amigável para o log

	// Se o arquivo já for .webp, pulamos
	if (fileExt.toLowerCase() === ".webp") {
		return {
			file: relativePath,
			status: "Skipped",
			originalSizeBytes: 0,
			newSizeBytes: 0,
		};
	}

	const outputPath = join(fileDir, `${fileName}.webp`);

	// Constroi o comando FFmpeg
	// -i: Arquivo de entrada
	// -q:v ${FFMPEG_QUALITY}: Define a qualidade de compressão (para webp)
	// -y: Sobrescreve o arquivo de saída se ele já existir
	// TODO: explicar o -vf
	const command = `ffmpeg -y -i "${imagePath}" -vf "scale=-2:'if(gt(ih,${MAX_HEIGHT}),${MAX_HEIGHT},ih)'" -q:v ${FFMPEG_QUALITY} "${outputPath}"`;

	console.log(`[Processando]: ${relativePath}`);

	try {
		const originalStats = await stat(imagePath);

		await execAsync(command);

		const newStats = await stat(outputPath);

		//  Exclui o arquivo original ---
		await unlink(imagePath);

		return {
			file: relativePath,
			status: "Converted",
			originalSizeBytes: originalStats.size,
			newSizeBytes: newStats.size,
		};
	} catch (error) {
		console.error(`[Erro] Falha ao processar ${relativePath}:`, error);
		return {
			file: relativePath,
			status: "Error",
			originalSizeBytes: 0,
			newSizeBytes: 0,
			error: (error as Error).message,
		};
	}
}

/**
 * Varre o diretório recursivamente em busca de imagens.
 */
async function scanDirectory(dir: string, results: ProcessResult[]) {
	try {
		const entries = await readdir(dir, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = join(dir, entry.name);

			if (entry.isDirectory()) {
				await scanDirectory(fullPath, results);
			} else if (entry.isFile()) {
				const ext = extname(entry.name).toLowerCase();
				if (SUPPORTED_EXTENSIONS.includes(ext) || ext === ".webp") {
					const result = await processImage(fullPath);
					results.push(result);
				}
			}
		}
	} catch (err) {
		console.error(`Não foi possível escanear o diretório ${dir}:`, err);
	}
}

interface TableDataProps {
	file: string;
	status: string;
	oldSize: string;
	newSize: string;
	economy: string;
}

/**
 * Função principal para iniciar o script e mostrar o resumo.
 */
async function main() {
	console.log("--- Iniciando otimização de imagens ---");
	console.log("AVISO: Este script SUBSTITUI os arquivos de imagem originais por versões .webp.");
	console.log("Os arquivos originais (png, jpg, etc.) SERÃO EXCLUÍDOS após a conversão.");
	console.log("Pressione Ctrl+C agora para cancelar (aguardando 5 segundos)...");

	await new Promise((resolve) => setTimeout(resolve, 5000));

	console.log("Iniciando varredura...\n");

	const results: ProcessResult[] = [];
	await scanDirectory(IMAGES_DIR, results);

	console.log("\n--- Processamento Concluído ---");

	// --- Geração da Tabela e Resumo ---

	let totalOriginal = 0;
	let totalNew = 0;
	let convertedCount = 0;
	let errorCount = 0;
	let skippedCount = 0;

	const tableData: TableDataProps[] = [];

	for (const res of results) {
		switch (res.status) {
			case "Converted":
				totalOriginal += res.originalSizeBytes;
				totalNew += res.newSizeBytes;
				convertedCount++;
				tableData.push({
					file: res.file,
					status: "✅ Convertido",
					oldSize: beautifyBytes(res.originalSizeBytes),
					newSize: beautifyBytes(res.newSizeBytes),
					economy: beautifyBytes(res.originalSizeBytes - res.newSizeBytes),
				});
				break;
			case "Skipped":
				skippedCount++;
				break;
			case "Error":
				errorCount++;
				tableData.push({
					file: res.file,
					status: `❌ Erro`,
					oldSize: "N/A",
					newSize: "N/A",
					economy: "N/A",
				});
				break;
		}
	}

	if (tableData.length > 0) {
		console.log("\n--- Relatório de Otimização ---");
		console.table(tableData, ["file", "status", "oldSize", "newSize", "economy"]);
	} else {
		console.log("\nNenhum arquivo novo foi convertido.");
	}

	const totalSavings = totalOriginal - totalNew;

	console.log("\n--- Resumo Total ---");
	console.log(`Arquivos Convertidos: ${convertedCount}`);
	console.log(`Arquivos Pulados (já .webp): ${skippedCount}`);
	console.log(`Erros: ${errorCount}`);
	console.log("-------------------------");
	console.log(`Tamanho Total Antigo: ${beautifyBytes(totalOriginal)}`);
	console.log(`Tamanho Total Novo: ${beautifyBytes(totalNew)}`);
	console.log(`🎉 Economia Total: ${beautifyBytes(totalSavings)}`);
	console.log("--- Otimização de imagens concluída ---");
}

// Inicia o processo
main().catch(console.error);
