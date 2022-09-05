import { observer } from 'mobx-react-lite'
import { Seo } from 'rakkas-seo'
import { useQuery } from 'rakkasjs'
import { createContext, useContext, useEffect, useMemo } from 'react'

import { HomeIntro } from '~/components/in-page/Home/intro'
import { HomeRandomSay } from '~/components/in-page/Home/random-say'
import { HomeSections } from '~/components/in-page/Home/section'
import { useInitialData, useKamiConfig } from '~/hooks/use-initial-data'
import { apiClient } from '~/utils/client'
import { Notice } from '~/utils/notice'

const IndexViewContext = createContext({ doAnimation: true })

export const useIndexViewContext = () => useContext(IndexViewContext)

const IndexView = () => {
  const initData = useInitialData()
  const pageData = useQuery('index-page', () => apiClient.aggregate.getTop())

  const { function: fn } = useKamiConfig()
  const { notification } = fn
  const doAnimation = Boolean(
    globalThis.history
      ? !history.backPath || history.backPath.length === 0
      : false,
  )

  useEffect(() => {
    Notice.shared.initNotice()
  }, [])

  useEffect(() => {
    if (!notification?.welcome) {
      return
    }
    const notificationOptions = notification.welcome
    const timer = setTimeout(() => {
      Notice.shared.createFrameNotification({
        title: notificationOptions.title,
        description: notificationOptions.message,
        avatar: notificationOptions.icon,
        onClick: () => {
          if (notificationOptions.toLink) {
            window.open(notificationOptions.toLink)
          }
        },
      })
    }, 1500)
    return () => {
      clearTimeout(timer)
    }
  }, [notification?.welcome])

  return (
    <main>
      <IndexViewContext.Provider
        value={useMemo(() => ({ doAnimation }), [doAnimation])}
      >
        <Seo
          title={`${initData.seo.title} · ${initData.seo.description}`}
          description={initData.seo.description}
        />
        <HomeIntro />

        <HomeRandomSay />
        <HomeSections {...pageData.data} />
      </IndexViewContext.Provider>
    </main>
  )
}
export default observer(IndexView)
