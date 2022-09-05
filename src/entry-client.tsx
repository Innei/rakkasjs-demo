import { startClient } from 'rakkasjs'

startClient({
  hooks: {
    beforeStart() {
      // Do something before starting the client
    },
    extendPageContext(ctx) {
      // Add properties to the page context,
      // especially to ctx.locals.
      // Extensions added here will only be
      // available on the client-side.
    },
    wrapApp(app) {
      // Wrap the Rakkas application in some provider
      // component (only on the client).

      return app
    },
  },
  defaultQueryOptions: {
    // Global defaults for `useQuery` options
  },
})
