import { Page, useQuery } from "rakkasjs";
import { useContext } from "react";
import { MainLayoutContext } from "./layout";

const HomePage: Page = function HomePage() {
  const { data } = useContext(MainLayoutContext);

  const fetchingAt = useQuery(
    "home",
    async () => {
      return +new Date();
    },
    {
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  return (
    <main>
      <h1>Hello world! {data.seo.title}</h1>
      <p>fetching at: {fetchingAt.data}</p>
      <p>Welcome to the Rakkas demo page 💃 {data.seo.description}</p>
      <p>
        Try editing the files in <code>src/routes</code> to get started or go to
        the{" "}
        <a href="https://rakkasjs.org" target="_blank" rel="noreferrer">
          website
        </a>
        .
      </p>
      <p>
        You may also check the little <a href="/todo">todo application</a> to
        learn about API endpoints and data fetching.
      </p>
    </main>
  );
};

export default HomePage;
