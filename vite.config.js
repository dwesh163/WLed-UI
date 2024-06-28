import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
	const config = {
		plugins: [react()],
		base: '/WLed-UI/',
	};

	if (command !== 'serve') {
		config.base = '/WLed-UI/';
		config.build = {
			rollupOptions: {
				output: {
					manualChunks: undefined,
				},
			},
		};
	}

	return config;
});
