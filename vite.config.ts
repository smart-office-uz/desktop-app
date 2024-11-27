import { defineConfig, loadEnv } from "vite";

// plugins
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// environment variables
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname), "");
  const CENTRIFUGE_TOKEN = env.CENTRIFUGE_TOKEN;
  const CENTRIFUGE_PATH = env.CENTRIFUGE_PATH;

  return {
    plugins: [react(), TanStackRouterVite(), svgr()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,

    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      port: 5173,
      strictPort: true,
      host: host || false,

      hmr: host
        ? {
            protocol: "ws",
            host,
            port: 5174,
          }
        : undefined,
      watch: {
        // 3. tell vite to ignore watching `src-tauri`
        ignored: ["**/src-tauri/**"],
      },
      proxy: {
        "/api/esign/challenge": {
          target:
            "https://smart-office.uz/services/platon-auth/api/eimzo/challenge",
          changeOrigin: true,
          rewrite: () => "",
        },
        "/api/esign/authenticate": {
          target: "https://smart-office.uz/services/platon-auth/api/eimzo",
          changeOrigin: true,
          rewrite: () => "",
        },
      },
    },
    define: {
      "import.meta.env.CENTRIFUGE_TOKEN": JSON.stringify(CENTRIFUGE_TOKEN),
      "import.meta.env.CENTRIFUGE_PATH": JSON.stringify(CENTRIFUGE_PATH),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    build: {
      commonjsOptions: {
        include: ["node_modules/**/*.js"],
      },
    },
  };
});
