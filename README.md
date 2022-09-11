# rakkasjs-kami

尝试迁移 NextJS 到 rakkajs。

目前遇到的问题：

- 生产环境 SSR 不支持 CJS 和 ESM 混用的库。（不支持不是 type: module 的库或者没有区别 .mjs .cjs 的库
