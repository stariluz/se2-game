import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ }) => {
  console.log("VITE_REPO_NAME:", process.env.VITE_REPO_NAME);
  return {
    plugins: [react()],

    resolve: {
      alias: {
        'src': fileURLToPath(new URL('./src', import.meta.url))
      },
    },

    base: process.env.NODE_ENV === 'production'
      ? `${process.env.VITE_REPO_NAME}` || '/'
      : '/',
  }
})