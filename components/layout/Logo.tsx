import s from './Logo.module.scss'
import cn from 'classnames'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { isServer } from '/lib/utils'
import Link from 'next/link'
import { useStore } from '/lib/store'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import useDevice from '/lib/hooks/useDevice'
import { useRegion } from '/lib/context/region'
import { regions } from '/lib/region'

export type Props = {
  //fixed: boolean
}

const letters = ['K', 'O', 'N', 'S', 'T', 'N', 'Ä', 'R', 'S', 'C', 'E', 'N', 'T', 'R', 'U', 'M']

export default function Logo({ }: Props) {

  const router = useRouter()
  const isHome = router.asPath === '/' || regions?.find(({ slug }) => slug === router.asPath.replace('/', '')) !== undefined
  const ref = useRef<HTMLDivElement | null>(null)

  const region = useRegion()
  const pageRegion = regions.find(r => router.asPath.startsWith(`/${r.slug}`))
  const [showMenuMobile, setShowMenuMobile, invertedMenu] = useStore((state) => [state.showMenuMobile, state.setShowMenuMobile, state.invertedMenu])
  const { isMobile } = useDevice()
  const { scrolledPosition, viewportHeight, documentHeight, isScrolling } = useScrollInfo()
  const [manualMode, setManualMode] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const isFixed = isHome ? false : atBottom ? false : true
  const maxRegionR = pageRegion ? (pageRegion?.name.length / letters.length) : 0;
  const maxR = 1 + maxRegionR
  const [height, setHeight] = useState(0)
  const [ratio, setRatio] = useState(0)

  const animateManual = useCallback((dir: 'horizontal' | 'vertical') => {

    setManualMode(true)

    let r = ratio;
    const step = maxR / (letters.length + region?.name.length)
    const interval = setInterval(() => {
      if (r > maxR || r < 0) {
        setRatio(r > maxR ? maxR : 0)
        return clearInterval(interval)
      }
      setRatio(dir === 'horizontal' ? r -= step : r += step)
    }, 20)

    return () => clearInterval(interval)
  }, [setManualMode, ratio, region, letters, maxR])

  const letterReducer = (direction: 'horizontal' | 'vertical') => {
    const l = letters.length;

    if (isFixed || (isMobile && !manualMode)) {
      if (isMobile && !manualMode)
        return direction === 'horizontal' ? letters : []
      if (!isMobile && !manualMode)
        return direction === 'vertical' ? letters : []
    }

    if (direction === 'vertical')
      return letters.filter((el, idx) => (((idx / l) < ratio)))
    else
      return letters.filter((el, idx) => ((idx / l) >= ratio || isServer))
  }

  useEffect(() => {

    const handleRouteChange = () => {
      if (!isFixed)
        animateManual('horizontal')
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)

  }, [router.asPath, ratio])

  useEffect(() => {
    if (manualMode)
      return

    let r;

    if (atBottom)
      r = ((documentHeight - ((scrolledPosition + viewportHeight))) / viewportHeight) * maxR;
    else
      r = Math.max(isFixed ? 1 - (maxR - maxRegionR) + Math.min(scrolledPosition / viewportHeight, maxRegionR) : 0, Math.min(scrolledPosition / viewportHeight, maxR))

    setRatio(r)

  }, [scrolledPosition, viewportHeight, documentHeight, isFixed, atBottom, setRatio, manualMode, height, region, maxR])

  useEffect(() => {
    return animateManual(showMenuMobile ? 'vertical' : 'horizontal')
  }, [showMenuMobile])

  useEffect(() => {
    if (isMobile) return
    setManualMode(false)
  }, [scrolledPosition, isMobile])

  useEffect(() => {
    setShowMenuMobile(false)
  }, [router, setShowMenuMobile])

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  }, [ref])

  useEffect(() => {
    const footer = document.getElementById('footer') as HTMLDivElement
    const footerThreshhold = documentHeight - footer.clientHeight
    setAtBottom((scrolledPosition + viewportHeight) > footerThreshhold)
  }, [scrolledPosition, documentHeight, viewportHeight])

  const vertical = letterReducer('vertical')
  const horizontal = letterReducer('horizontal')
  const regionPerc = (pageRegion?.name.length / letters.length)
  const regionRatio = (ratio > 1 && !isFixed && !isMobile ? 1 - ((ratio - 1) / regionPerc) : isFixed) ? 1 - ((1 + regionPerc) * ratio) : 1

  return (
    <div className={cn(s.container, invertedMenu && s.inverted)}>
      <div className={s.logo}>
        <div className={s.horizontal}>
          <Link href="/">
            {horizontal.map((l, i) => l)}
          </Link>
          {pageRegion && !pageRegion?.global &&
            <Link href={`/${pageRegion?.slug}`} className={cn(s.region, horizontal.length === 0 && s.end)}>
              {pageRegion.name.substring(0, (pageRegion.name.length) * regionRatio)}
            </Link>
          }
        </div>
        <div className={s.vertical} ref={ref}>
          <Link href="/">
            {vertical.map((l, i) => l)}
          </Link>
          {horizontal.length > 0 &&
            <div className={s.space}></div>
          }
        </div>
      </div>
    </div>
  )
}