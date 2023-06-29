/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_INTERNAL_API_HOST: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
