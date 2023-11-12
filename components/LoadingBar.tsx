"use client"

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const LoadingBar = () => {
  return (
    <ProgressBar
      height="4px"
      color="#E2E8F0"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}

export default LoadingBar