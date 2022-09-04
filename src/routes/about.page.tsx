import { useQuery } from "rakkasjs";
import type { FC } from "react";

class RequestError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
  toResponse() {
    return new Response(this.message, { status: this.status });
  }
}

const AboutPage: FC = () => {
  const data = useQuery("about", async () => {
    throw new RequestError("404 Not Found", 404);
    return {
      text: "Hello world!",
    };
  });
  return (
    <main>
      <h1>About</h1>
      {data.data.text}
    </main>
  );
};

export default AboutPage;
