import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { breakpoints } from '/lib/utils'

export default function useDevice() {

  const mobile = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)
  const desktop = useMediaQuery(`(max-width: ${breakpoints.desktop}px)`)
  const [isMobile, setIsMobile] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsMobile(mobile)
    setIsDesktop(desktop)
  }, [mobile, desktop])

  return { isMobile, isDesktop }
}

