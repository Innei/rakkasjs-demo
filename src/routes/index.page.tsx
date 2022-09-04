import type { Page} from "rakkasjs";

import { useInitialData } from "~/hooks/use-initial-data";
const HomePage: Page = function HomePage() {
  return <main>{JSON.stringify(useInitialData())}</main>;
};

export default HomePage;
