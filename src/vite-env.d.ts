/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.md' {
	const value: string;
	export default value;
}

//Used to provide TS declarations for non-TS modules
declare module '*&imagetools' {
	/**
	 * actual types
	 * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
	 * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
	 */
	const out;
	export default out;
}
