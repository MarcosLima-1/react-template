import { exec } from "node:child_process";
import { readdir, stat, unlink } from "node:fs/promises";
import { basename, dirname, extname, join, relative } from "node:path";
import { promisify } from "node:util";
import { consola } from "consola";
import { beautifyBytes } from "../src/utils/formatters/beautify-bytes";

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

const execAsync = promisify(exec);

const IMAGES_DIR = join(process.cwd(), "public", "images");
const FFMPEG_QUALITY = 50; // Qualidade WebP (0-100, onde 100 é a melhor)
const MAX_HEIGHT = 720; // Resolução máxima (altura)
const SUPPORTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".bmp", ".tiff"];

// ============================================================================
// TIPOS
// ============================================================================

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
	const relativePath = relative(IMAGES_DIR, imagePath);

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

	// Constrói o comando FFmpeg
	// -i: Arquivo de entrada
	// -q:v: Define a qualidade de compressão (para webp)
	// -y: Sobrescreve o arquivo de saída se ele já existir
	// -vf: Filtro de vídeo para redimensionar mantendo proporção
	const command = `ffmpeg -y -i "${imagePath}" -vf "scale=-2:'if(gt(ih,${MAX_HEIGHT}),${MAX_HEIGHT},ih)'" -q:v ${FFMPEG_QUALITY} "${outputPath}"`;

	consola.start(`Processando: ${relativePath}`);

	try {
		const originalStats = await stat(imagePath);
		await execAsync(command);
		const newStats = await stat(outputPath);

		// Exclui o arquivo original
		await unlink(imagePath);

		consola.success(`Convertido: ${relativePath}`);

		return {
			file: relativePath,
			status: "Converted",
			originalSizeBytes: originalStats.size,
			newSizeBytes: newStats.size,
		};
	} catch (error) {
		consola.error(`Falha ao processar ${relativePath}: ${(error as Error).message}`);
		return {
			file: relativePath,
			status: "Error",
			originalSizeBytes: 0,
			newSizeBytes: 0,
			error: (error as Error).message,
		};
	}
}

// ============================================================================
// UTILITÁRIOS
// ============================================================================

/**
 * Varre o diretório recursivamente em busca de imagens.
 */
async function scanDirectory(dir: string, results: ProcessResult[]): Promise<void> {
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
		consola.error(`Não foi possível escanear o diretório ${dir}: ${err}`);
	}
}

interface TableDataProps {
	file: string;
	status: string;
	oldSize: string;
	newSize: string;
	economy: string;
}

// ============================================================================
// FUNÇÃO PRINCIPAL
// ============================================================================

/**
 * Função principal para iniciar o script e mostrar o resumo.
 */
async function main(): Promise<void> {
	consola.box("🖼️  Otimização de Imagens");

	consola.warn("⚠️  Este script SUBSTITUI os arquivos originais por versões .webp!");
	consola.warn("Pressione Ctrl+C agora para cancelar (aguardando 5 segundos)...\n");

	await new Promise((resolve) => setTimeout(resolve, 5000));

	consola.log("Iniciando varredura do diretório...\n");

	const results: ProcessResult[] = [];
	await scanDirectory(IMAGES_DIR, results);

	// =========================================================================
	// PROCESSAMENTO DOS RESULTADOS
	// =========================================================================

	consola.log("");
	consola.box("📊 Processamento Concluído");

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
					status: "❌ Erro",
					oldSize: "N/A",
					newSize: "N/A",
					economy: "N/A",
				});
				break;
		}
	}

	// Exibe a tabela de resultados
	if (tableData.length > 0) {
		consola.log("\n📋 Relatório Detalhado:\n");
		console.table(tableData, ["file", "status", "oldSize", "newSize", "economy"]);
	} else {
		consola.info("ℹ️  Nenhum arquivo novo foi convertido.");
	}

	// =========================================================================
	// RESUMO FINAL
	// =========================================================================

	const totalSavings = totalOriginal - totalNew;
	const savingsPercent = totalOriginal > 0 ? ((totalSavings / totalOriginal) * 100).toFixed(2) : "0";

	consola.log(`📁 Arquivos Convertidos: ${convertedCount}`);
	consola.log(`⏭️  Arquivos Pulados (.webp): ${skippedCount}`);
	consola.log(`❌ Erros: ${errorCount}`);
	consola.log("");
	consola.log(`📦 Tamanho Original: ${beautifyBytes(totalOriginal)}`);
	consola.log(`📦 Tamanho Final: ${beautifyBytes(totalNew)}`);
	consola.success(`🎉 Economia Total: ${beautifyBytes(totalSavings)} (${savingsPercent}%)`);
}

// ============================================================================
// EXECUÇÃO
// ============================================================================

main().catch((error) => {
	consola.error("❌ Erro ao executar o script:");
	consola.error(error);
	process.exit(1);
});
