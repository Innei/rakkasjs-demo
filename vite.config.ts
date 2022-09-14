import dns from 'dns'
import rakkas from 'rakkasjs/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

dns.setDefaultResultOrder('verbatim')

// const noExternalSet = new Set(Object.keys(pkg.dependencies))
const noExternalSet = new Set(['react-use', 'axios', 'rakkas-seo'])
// ;[
//   'react',
//   'react-dom',
//   'react-toastify',
//   'react-shortcut-guide',
//   'react-message-popup',
//   'react-intersection-observer',
//   'markdown-to-jsx',
//   'ky',
//   'ky-universal',
//   'css-spring',
//   'react-transition-group',
//   'qier-progress',
//   'remove-markdown',
//   'react-collapse',
//   'randomcolor',
// ].forEach((name) => {
//   noExternalSet.delete(name)
// })

export default ({ mode }) => {
  process.env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [tsconfigPaths(), rakkas(), WindiCSS()],
    build: {
      target: 'esnext',
    },
    ssr: {
      noExternal: [...noExternalSet.values()],
    },
    define: {
      __DEV__: process.env.NODE_ENV === 'development',
    },
    server: {
      port: 2323,
    },
  })
}
