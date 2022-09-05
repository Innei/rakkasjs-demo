import cloneDeep from 'lodash-es/cloneDeep'
import mergeWith from 'lodash-es/mergeWith'
import { useQuery } from 'rakkasjs'
import { createContext, memo, useEffect, useMemo } from 'react'

import type { AggregateRoot } from '@mx-space/api-client'

import { defaultConfigs } from '~/configs.default'
import type { KamiConfig } from '~/types/config'
import { fetchInitialData } from '~/utils/app'

export type InitialDataType = {
  aggregateData: AggregateRoot
  config: KamiConfig
}
export const InitialContext = createContext({} as InitialDataType)

const getInitialData = async () => {
  const { aggregateData, config } = await fetchInitialData()
  return {
    aggregateData,
    config,
  }
}

export const InitialContextProvider = memo((props) => {
  const initialData = useQuery('@@init', getInitialData)

  const mergeThemeConfig = useMemo(() => {
    return mergeWith(
      cloneDeep(defaultConfigs),
      initialData.data.config,
      (old, newer) => {
        // 数组不合并
        if (Array.isArray(old)) {
          return newer
        }
      },
    ) as KamiConfig
  }, [])
  useEffect(() => {
    window.data = {
      aggregateData: initialData.data.aggregateData,
      config: mergeThemeConfig,
    }
  }, [mergeThemeConfig, initialData.data.aggregateData])

  return (
    <InitialContext.Provider
      value={useMemo(
        () => ({
          aggregateData: initialData.data.aggregateData,
          config: mergeThemeConfig,
        }),
        [mergeThemeConfig, initialData.data.aggregateData],
      )}
    >
      {props.children}
    </InitialContext.Provider>
  )
})
