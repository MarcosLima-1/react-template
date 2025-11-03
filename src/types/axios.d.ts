import "axios";

declare module "axios" {
	/**
	 * Estende as interfaces de Configuração do Axios para adicionar a propriedade customizada
	 * que será usada na lógica de retentativa.
	 * * A propriedade é marcada como opcional (?) pois não estará presente em todas as requisições,
	 * apenas naquelas que já foram retentadas.
	 */
	export interface AxiosRequestConfig {
		_isRetry?: boolean;
	}
}
