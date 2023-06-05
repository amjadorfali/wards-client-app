import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

process.env.BROWSER = 'google chrome';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), splitVendorChunkPlugin(), svgr()],
	server: {
		open: true,
		port: 3000
	},
	build: {
		chunkSizeWarningLimit: 500 // default
	}
});
