'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

type PageClientProps = {
  heroType?: Page['hero']['type']
}

const PageClient: React.FC<PageClientProps> = ({ heroType }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    if (
      !heroType ||
      heroType === 'marketingHero' ||
      heroType === 'lowImpact' ||
      heroType === 'mediumImpact' ||
      heroType === 'none'
    ) {
      setHeaderTheme('light')
    }
  }, [heroType, setHeaderTheme])

  return <React.Fragment />
}

export default PageClient
