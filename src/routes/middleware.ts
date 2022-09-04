import type { RequestContext } from "rakkasjs";

declare module "rakkasjs" {}

export default async function sessionMiddleware(ctx: RequestContext) {
  console.log(ctx.request);
}
