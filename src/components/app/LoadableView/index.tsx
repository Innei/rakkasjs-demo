import { observer } from 'mobx-react-lite'
import type { FC, ReactElement } from 'react'
import React, { useEffect } from 'react'

import { Loading } from '~/components/universal/Loading'
import type { Store } from '~/store/helper/base'

export const DataLoadingView: FC<{
  // fetchFn: () => Promise<{ id: string; [key: string]: any }>
  // key: string
  data: any
  store: Store<any>
  children: ReactElement
}> = observer((props) => {
  const { data, store, children } = props

  useEffect(() => {
    // if (!queryResult?.data) {
    //   return
    // }
    // const { id } = queryResult.data
    const { id } = data
    store.add(id, {
      ...data,
    })
  }, [data])

  const dataFromStore = store.get(data?.id)
  if (data && dataFromStore) {
    return React.cloneElement(children, {
      ...data,
    })
  } else {
    return <Loading />
  }
})
