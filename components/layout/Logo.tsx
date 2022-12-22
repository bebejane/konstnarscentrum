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

export type Props = {
  fixed: boolean
}

const letters = ['K', 'O', 'N', 'S', 'T', 'N', 'Ä', 'R', 'S', 'C', 'E', 'N', 'T', 'R', 'U', 'M']

export default function Logo({ fixed }: Props) {

  const ref = useRef<HTMLDivElement | null>(null)
  const router = useRouter()
  const region = useRegion()
  const [showMenuMobile, setShowMenuMobile, invertedMenu] = useStore((state) => [state.showMenuMobile, state.setShowMenuMobile, state.invertedMenu])
  const { isMobile } = useDevice()
  const { scrolledPosition, viewportHeight, documentHeight } = useScrollInfo()
  const [manualMode, setManualMode] = useState(false)
  const [ratio, setRatio] = useState(0)
  const [height, setHeight] = useState(0)
  const [atBottom, setAtBottom] = useState(false)
  const maxR = 1 + (region.name.length / letters.length)
  const isFixed = !fixed ? false : fixed && !atBottom

  const animateManual = useCallback((dir: 'horizontal' | 'vertical') => {

    setManualMode(true)

    let r = ratio;
    const step = maxR / (letters.length + region.name.length)
    const interval = setInterval(() => {
      if (r > maxR || r < 0) {
        setRatio(r > maxR ? maxR : 0)
        return clearInterval(interval)
      }
      setRatio(dir === 'horizontal' ? r += step : r -= step)
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
        animateManual('vertical')
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)

  }, [router.asPath])

  useEffect(() => {
    if (manualMode)
      return

    let r;

    if (atBottom)
      r = ((documentHeight - ((scrolledPosition + viewportHeight))) / viewportHeight) * maxR;
    else
      r = Math.max(0, Math.min(scrolledPosition / viewportHeight, maxR))

    setRatio(r)

  }, [scrolledPosition, viewportHeight, documentHeight, atBottom, setRatio, manualMode, height, region, maxR])

  useEffect(() => {
    return animateManual(!showMenuMobile ? 'vertical' : 'horizontal')
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
  const regionPerc = (region.name.length / letters.length)
  const regionRatio = ratio > 1 && !isFixed && !isMobile ? 1 - ((ratio - 1) / regionPerc) : isFixed ? 1 - ((1 + regionPerc) * ratio) : 1

  return (
    <div className={cn(s.container, invertedMenu && s.inverted)}>
      <div className={s.logo}>
        <div className={s.horizontal}>
          <Link href="/">
            {horizontal.map((l, i) => l)}
          </Link>
          {region && !region?.global &&
            <Link href={`/${region?.slug}`} className={cn(s.region, horizontal.length === 0 && s.end)}>
              {region.name.substring(0, (region.name.length) * regionRatio)}
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