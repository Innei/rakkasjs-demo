import type { FC } from 'react'
import React, { Suspense, createElement } from 'react'

export function dynamic<P = {}>(fn: () => Promise<FC<P>>) {
  const lazyComponent: React.LazyExoticComponent<React.ComponentType<P>> =
    React.lazy(() => fn().then((fc) => (fc.default ? fc : { default: fc })))
  return (props: P) => (
    <Suspense fallback={null}>
      {createElement(lazyComponent, props as any, (props as any)?.children)}
    </Suspense>
  )
}
