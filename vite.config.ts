import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
		alias: {
			'@shared': path.resolve(__dirname, 'src/shared'),
		},
	},
})
