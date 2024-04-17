import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	esbuild: {
		supported: {
			'top-level-await': true, //browsers can handle top-level-await features
		},
	},
})
