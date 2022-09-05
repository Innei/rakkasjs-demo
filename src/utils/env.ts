export const isClientSide = () => {
  return typeof window !== 'undefined'
}
export const isServerSide = () => {
  return !isClientSide()
}

export const isDev = __DEV__
