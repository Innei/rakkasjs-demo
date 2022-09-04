import { loadEnv, defineConfig } from "vite";
import rakkas from "rakkasjs/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import WindiCSS from "vite-plugin-windicss";

export default ({ mode }) => {
  process.env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [tsconfigPaths(), rakkas(), WindiCSS()],
    ssr: { noExternal: ["rakkas-seo"] },
    define: {
      __DEV__: process.env.NODE_ENV === "development",
    },
    server: {
      port: 2323,
    },
  });
};
