// This is the main layout of our app. It renders the header and the footer.
import { ErrorBoundary, Layout } from 'rakkasjs'
import { useRef } from 'react'
import type { ToastContainerProps } from 'react-toastify'
import { ToastContainer } from 'react-toastify'

import 'virtual:windi.css'
import '../assets/styles/main.css'

import { AppLayout } from '~/components/layouts/AppLayout'
import { BasicLayout } from '~/components/layouts/BasicLayout'
import { InitialContextProvider, RootStoreProvider } from '~/context'

// Vite supports CSS modules out of the box!

const MainLayout: Layout = ({ children }) => {
  return (
    <>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => {
          return (
            <div>
              {/* {error.status && <ResponseHeaders status={error.status} />} */}
              <h1>An error has occurred</h1>
              <pre>{error.message}</pre>
              <button
                onClick={() => {
                  resetErrorBoundary()
                }}
              >
                Try again
              </button>
            </div>
          )
        }}
      >
        <head>
          <style
            dangerouslySetInnerHTML={{
              __html: `.loader-logo{top:50%;left:50%;opacity:1;z-index:100;height:8em;color:#fff !important;position:fixed;transform:translate(-50%, -50%);transition:none !important;perspective:1500px}.loader-logo .animation{animation:zoom-in 1s ease-out backwards;position:relative;z-index:999;transform:translate3d(0, 0, 0);will-change:transform}.loader:before{top:50%;pointer-events:none;left:50%;z-index:99;content:'';width:100vmax;height:100vmax;position:fixed;border-radius:50%;background:var(--green);transform:translate(-50%, -50%) scale(1.5);animation:fade-out 1s ease-out}body.loading .loader:before{pointer-events:all;opacity:1;transition:opacity 0.2s;}body.loading .loader-logo{transform:translate(-50%, -50%) scale(1);transition:transform 0.8s cubic-bezier(0.5, 0, 0.5, 1.5)}@keyframes zoom-in{50%{transform:translate3d(0, 0, -300px);opacity:1}80%{opacity:1}to{transform:translate3d(0, 0, 1500px);opacity:0}}@keyframes fade-out{30%{opacity:1}60%{opacity:1}100%{opacity:0}}`,
            }}
          />
        </head>
        <body id={'app'} className="loading">
          <InitialContextProvider>
            <RootStoreProvider>
              <BasicLayout>
                <AppLayout>{children}</AppLayout>
              </BasicLayout>
              <ToastProvider />
            </RootStoreProvider>
          </InitialContextProvider>
        </body>
      </ErrorBoundary>
    </>
  )
}

function ToastProvider() {
  const toastOptions = useRef<ToastContainerProps>({
    autoClose: 3000,
    pauseOnHover: true,
    hideProgressBar: true,
    newestOnTop: true,
    closeOnClick: true,
    closeButton: false,
    toastClassName: () => '',
    bodyClassName: () => '',
  })
  return <ToastContainer {...toastOptions.current} />
}
export default MainLayout
