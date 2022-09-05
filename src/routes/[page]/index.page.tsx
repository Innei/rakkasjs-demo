import { observer } from 'mobx-react-lite'
import { Link, useQuery } from 'rakkasjs'
import type { FC } from 'react'
import React, { Fragment, Suspense, useEffect, useMemo, useRef } from 'react'
import RemoveMarkdown from 'remove-markdown'

import type { PageModel } from '@mx-space/api-client'

import { DataLoadingView } from '~/components/app/LoadableView'
import { ArticleLayout } from '~/components/layouts/ArticleLayout'
import { Markdown } from '~/components/universal/Markdown'
import { store } from '~/context'
import { useHeaderMeta, useHeaderShare } from '~/hooks/use-header-meta'
import { useInitialData } from '~/hooks/use-initial-data'
import { useJumpToSimpleMarkdownRender } from '~/hooks/use-jump-to-render'
import { useRouter } from '~/hooks/use-router'
import { useStore } from '~/store'
import { imagesRecord2Map } from '~/utils/images'
import { appendStyle } from '~/utils/load-script'
import { springScrollToTop } from '~/utils/spring'
import { noop } from '~/utils/utils'

import { Seo } from '../../components/biz/Seo'
import { ImageSizeMetaContext } from '../../context/image-size'
import styles from './index.module.css'

const CommentLazy = React.lazy(() =>
  import('~/components/widgets/Comment').then((mo) => ({
    default: mo.CommentLazy,
  })),
)

const PageView: FC<PageModel> = observer((props) => {
  const { pageStore } = useStore()
  const page = pageStore.get(props.id) || (noop as PageModel)
  const { title, subtitle, text } = page

  useEffect(() => {
    if (page.meta?.style) {
      const $style = appendStyle(page.meta.style)

      return () => {
        $style && $style.remove()
      }
    }
  }, [page.meta?.style])

  useHeaderMeta(page.title, page.subtitle || '')
  useHeaderShare(page.title)
  useJumpToSimpleMarkdownRender(page.id)

  useEffect(() => {
    springScrollToTop()
  }, [props.id])
  const { pageMeta } = useInitialData()
  const pages = useMemo(() => pageMeta || [], [pageMeta])
  const indexInPages = pages.findIndex((i) => i.title == page.title)
  const n = pages.length
  const hasNext = indexInPages + 1 < n
  const hasPrev = indexInPages - 1 >= 0
  return (
    <ArticleLayout title={title} subtitle={subtitle} id={props.id} type="page">
      <Seo
        title={title}
        openGraph={
          useRef<{
            type: 'article'
          }>({ type: 'article' }).current
        }
        description={RemoveMarkdown(text).slice(0, 100).replace('\n', '')}
      />
      <ImageSizeMetaContext.Provider
        value={useMemo(
          () => imagesRecord2Map(page.images || []),
          [page.images],
        )}
      >
        <article>
          <h1 className="sr-only">{title}</h1>
          <Markdown value={text} toc />
        </article>
      </ImageSizeMetaContext.Provider>
      {useMemo(
        () => (
          <div className={styles['pagination']}>
            <div>
              {hasPrev && (
                <Fragment>
                  <Link
                    href={`/${pages[indexInPages - 1].slug}`}
                    className="flex flex-col justify-end"
                  >
                    <h2 className="text-indigo-400">回顾一下：</h2>
                    <p className="text-left">{pages[indexInPages - 1].title}</p>
                  </Link>
                </Fragment>
              )}
            </div>
            <div>
              {hasNext && (
                <Fragment>
                  <Link
                    href={`/${pages[indexInPages + 1].slug}`}
                    className="flex flex-col justify-end"
                  >
                    <h2 className="text-indigo-400">继续了解：</h2>
                    <p className="text-right">
                      {pages[indexInPages + 1].title}
                    </p>
                  </Link>
                </Fragment>
              )}
            </div>
          </div>
        ),
        [hasNext, hasPrev, indexInPages, pages],
      )}
      <Suspense fallback={null}>
        <CommentLazy
          key={page.id}
          id={page.id}
          allowComment={page.allowComment ?? true}
        />
      </Suspense>
    </ArticleLayout>
  )
})

const Page: FC = () => {
  const { params } = useRouter()
  const slug = params.page as string
  const queryResult = useQuery(
    `page-${slug}`,
    () => store.pageStore.fetchBySlug(slug),
    {
      cacheTime: 1000 * 60 * 60,
      refetchOnReconnect: true,
    },
  )
  return (
    <DataLoadingView data={queryResult.data} store={store.pageStore}>
      {/* @ts-ignore */}
      <PageView />
    </DataLoadingView>
  )
}

export default Page
