import { useEffect, useState } from 'react'
import { useMediaQuery, useWindowSize } from 'usehooks-ts'
import { breakpoints } from '/lib/utils'

export default function useDevice() {

  const mobile = !useMediaQuery(`(min-width: ${breakpoints.mobile}px)`)
  const desktop = !useMediaQuery(`(min-width: ${breakpoints.desktop}px)`)
  const tablet = !useMediaQuery(`(min-width: ${breakpoints.tablet}px)`)
  const { width, height } = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    setIsMobile(mobile)
    setIsDesktop(!mobile && !tablet ? true : false)
    setIsTablet(desktop && !mobile ? true : false)
  }, [mobile, desktop, tablet, width, height])

  return { isMobile, isDesktop, isTablet }
}

