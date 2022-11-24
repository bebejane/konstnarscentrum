import { useMediaQuery } from 'usehooks-ts'
import { breakpoints } from '/lib/utils'

export default function useDevice() {

  const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop}px)`)

  return { isMobile, isDesktop }
}

