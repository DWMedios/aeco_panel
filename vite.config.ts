import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      port: 80,
      host: true,
      strictPort: true,
      watch: {
       usePolling: true,
      },
      esbuild: {
       target: "esnext",
       platform: "linux",
     },
     cors: {
       origin: '*',
     },
   },
   define: {
    VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL),
   },
   preview: {
    port: 80,
    host: true,
    strictPort: true,
   }
  };
 });
