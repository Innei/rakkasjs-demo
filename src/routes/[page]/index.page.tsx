import type { FC } from 'react'

import { useRouter } from '~/hooks/use-router'

const Page: FC = () => {
  const { params } = useRouter()
  return <>{params.page}</>
}

export default Page
