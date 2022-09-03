// This is the main layout of our app. It renders the header and the footer.

import {
  ErrorBoundary,
  Head,
  Layout,
  Link,
  StyledLink,
  useQuery,
} from "rakkasjs";
import { createContext, FC } from "react";

// Vite supports CSS modules out of the box!
import css from "./layout.module.css";

const getInitialData = async () => {
  return {
    data: {
      seo: {
        title: "Demo App",
        description: "This is a demo app",
      },
    },
  };
};

export const MainLayoutContext = createContext<
  Awaited<ReturnType<typeof getInitialData>>
>({} as any);

const RootDataProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const initialData = useQuery("@@init", getInitialData);

  return (
    <MainLayoutContext.Provider value={initialData.data}>
      {children}
    </MainLayoutContext.Provider>
  );
};

const MainLayout: Layout = ({ children }) => {
  return (
    <>
      {/* Rakkas relies on react-helmet-async for managing the document head */}
      {/* See their documentation: https://github.com/staylor/react-helmet-async#readme */}
      <Head title="Rakkas Demo App" />

      <header className={css.header}>
        {/* <Link /> is like <a /> but it provides client-side navigation without full page reload. */}
        <Link className={css.logo} href="/">
          Rakkas Demo App
        </Link>

        <nav className={css.nav}>
          <ul>
            <li>
              {/* <StyledLink /> is like <Link /> but it can be styled based on the current route ()which is useful for navigation links). */}
              <StyledLink href="/" activeClass={css.activeLink}>
                Home
              </StyledLink>
            </li>
            <li>
              <StyledLink href="/about" activeClass={css.activeLink}>
                About
              </StyledLink>
            </li>
            <li>
              <StyledLink href="/todo" activeClass={css.activeLink}>
                Todo
              </StyledLink>
            </li>
          </ul>
        </nav>
      </header>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => {
          return (
            <div>
              {/* {error.status && <ResponseHeaders status={error.status} />} */}
              <h1>An error has occurred</h1>
              <pre>{error.message}</pre>
              <button
                onClick={() => {
                  resetErrorBoundary();
                }}
              >
                Try again
              </button>
            </div>
          );
        }}
      >
        <RootDataProvider>
          <section className={css.main}>{children}</section>
        </RootDataProvider>
      </ErrorBoundary>

      <footer className={css.footer}>
        <p>
          Software and documentation: Copyright 2021 Fatih Aygün. MIT License.
        </p>

        <p>
          Favicon: “Flamenco” by{" "}
          <a href="https://thenounproject.com/term/flamenco/111303/">
            gzz from Noun Project
          </a>{" "}
          (not affiliated).
          <br />
          Used under{" "}
          <a href="https://creativecommons.org/licenses/by/2.0/">
            Creative Commons Attribution Generic license (CCBY)
          </a>
        </p>
      </footer>
    </>
  );
};

export default MainLayout;
