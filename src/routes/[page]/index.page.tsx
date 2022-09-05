import type { FC } from 'react'

import { useRouter } from '~/hooks/use-router'

const Page: FC = () => {
  useRouter()
  return <>{'test'}</>
}

export default Page
