import { navigate, usePageContext } from 'rakkasjs'
import { useContext, useRef } from 'react'

import { ParamsContext } from '~/context/params'

export const useRouter = () => {
  const pageConext = usePageContext()
  const params = useContext(ParamsContext)

  return useRef({
    push: (url: string) => {
      navigate(url, {
        scroll: true,
      })
    },
    replace(url: string) {
      navigate(url, {
        replace: true,
        scroll: true,
      })
    },
    ...pageConext.url,
    asPath: window.location.pathname,
    path: window.location.pathname,
    url: pageConext.url,

    params,
    query: {
      ...params,
      ...Object.fromEntries(pageConext.url.searchParams.entries()),
    },
  }).current
}
