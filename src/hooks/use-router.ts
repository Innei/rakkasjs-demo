import { navigate } from "rakkasjs";
import { useRef } from "react";

export const useRouter = () => {
  return useRef({
    push: (url: string) => {
      navigate(url, {
        scroll: true,
      });
    },
    replace(url: string) {
      navigate(url, {
        replace: true,
        scroll: true,
      });
    },
    asPath: window.location.pathname,
    path: window.location.pathname,
    // TODO
    params: {},
    query: {},
  }).current;
};
