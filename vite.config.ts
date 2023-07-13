import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { imagetools } from 'vite-imagetools';

process.env.BROWSER = 'google chrome';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), splitVendorChunkPlugin(), svgr(), imagetools()],
	server: {
		open: true,
		port: 3000
	},
	build: {
		chunkSizeWarningLimit: 650, //TODO: 500 is default, revert to 500 later once you figure out chunking react-syntax-highlighter
		rollupOptions: {
			output: {
				manualChunks: {
					echarts: ['echarts']
				}
			}
		}
	}
});
