import dns from 'dns'
import rakkas from 'rakkasjs/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

dns.setDefaultResultOrder('verbatim')
export default ({ mode }) => {
  process.env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [tsconfigPaths(), rakkas(), WindiCSS()],
    ssr: { noExternal: ['rakkas-seo'] },
    define: {
      __DEV__: process.env.NODE_ENV === 'development',
    },
    server: {
      port: 2323,
    },
  })
}
