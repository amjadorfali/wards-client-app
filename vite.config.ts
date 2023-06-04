import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

process.env.BROWSER = 'google chrome';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), splitVendorChunkPlugin()],
	server: {
		open: true,
		port: 3000
	},
	build: {
		chunkSizeWarningLimit: 500 // default
	}
});
