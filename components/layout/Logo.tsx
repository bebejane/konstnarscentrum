import s from './Logo.module.scss'
import cn from 'classnames'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { isServer, randomInt } from '/lib/utils'
import Link from 'next/link'
import { useStore } from '/lib/store'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import useDevice from '/lib/hooks/useDevice'
import { useRegion } from '/lib/context/region'
import { regions } from '/lib/region'
import { useTheme } from 'next-themes'
import { RegionLink } from '/components'

export type Props = {

}

const letters = ['K', 'O', 'N', 'S', 'T', 'N', 'Ä', 'R', 'S', 'C', 'E', 'N', 'T', 'R', 'U', 'M']

export default function Logo({ }: Props) {

  const router = useRouter()
  const { theme } = useTheme()
  const isHome = router.asPath === '/' || regions?.find(({ slug }) => slug === router.asPath.replace('/', '')) !== undefined
  const ref = useRef<HTMLDivElement | null>(null)
  const wobbleTimeout = useRef<NodeJS.Timer | undefined>()


  const region = useRegion()
  const pageRegion = regions.find(r => router.asPath.startsWith(`/${r.slug}`))
  const [showMenuMobile, setShowMenuMobile, invertedMenu] = useStore((state) => [state.showMenuMobile, state.setShowMenuMobile, state.invertedMenu])
  const { isDesktop } = useDevice()
  const { scrolledPosition, viewportHeight, documentHeight, isScrolling, isPageBottom } = useScrollInfo()
  const [manualMode, setManualMode] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const isFixed = isHome ? false : atBottom ? false : true
  const maxRegionR = pageRegion ? (pageRegion?.name.length / letters.length) : 0;
  const maxR = 1 + maxRegionR
  const [height, setHeight] = useState(0)
  const [ratio, setRatio] = useState<number | undefined>(0)
  const [menuMobileSwitch, setMenuMobileSwitch] = useState<boolean | undefined>()

  const animateManual = useCallback((dir: 'horizontal' | 'vertical', start?: number) => {

    let r = start !== undefined ? start : ratio
    const step = maxR / (letters.length + region?.name.length)
    const interval = setInterval(() => {
      if (r > maxR || r < 0 || isNaN(r)) {
        setRatio(r > maxR ? maxR : 0)
        return clearInterval(interval)
      }
      setRatio(dir === 'horizontal' ? r -= step : r += step)
    }, 20)

    return () => clearInterval(interval)
  }, [setManualMode, ratio, region, maxR])

  const letterReducer = (direction: 'horizontal' | 'vertical') => {
    const l = letters.length;

    if (isFixed || (!isDesktop && !manualMode)) {
      if (!isDesktop && !manualMode)
        return direction === 'horizontal' ? letters : showMenuMobile ? letters : []
      if (isDesktop && !manualMode && !showMenuMobile)
        return direction === 'vertical' ? letters : []
    }

    if (direction === 'vertical')
      return letters.filter((el, idx) => (((idx / l) < ratio)))
    else
      return letters.filter((el, idx) => ((idx / l) >= ratio || isServer))
  }

  useEffect(() => {
    if (manualMode)
      return

    let r;

    if (atBottom)
      r = ((documentHeight - ((scrolledPosition + viewportHeight))) / viewportHeight) * maxR;
    else
      r = Math.max(isFixed ? 1 - (maxR - maxRegionR) + Math.min(scrolledPosition / viewportHeight, maxRegionR) : 0, Math.min(scrolledPosition / viewportHeight, maxR))

    requestAnimationFrame(() => setRatio(r))

  }, [scrolledPosition, viewportHeight, maxRegionR, documentHeight, isFixed, atBottom, setRatio, manualMode, height, region, maxR])

  useEffect(() => {
    setMenuMobileSwitch(showMenuMobile ? true : menuMobileSwitch === undefined ? undefined : false)
  }, [setMenuMobileSwitch, showMenuMobile, menuMobileSwitch])

  useEffect(() => {
    if (menuMobileSwitch !== undefined) {
      setManualMode(true)
      return animateManual(menuMobileSwitch ? 'vertical' : 'horizontal')
    }
  }, [menuMobileSwitch])

  useEffect(() => {
    if (!isDesktop || scrolledPosition === 0) return

    setManualMode(false)
  }, [scrolledPosition, isDesktop])

  useEffect(() => {
    setShowMenuMobile(false)
  }, [router])

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  }, [ref])

  useEffect(() => {
    const footer = document.getElementById('footer') as HTMLDivElement
    const footerThreshhold = documentHeight - footer.clientHeight
    setAtBottom((scrolledPosition + viewportHeight) > footerThreshhold)
  }, [scrolledPosition, documentHeight, viewportHeight])

  useEffect(() => {

    const handleRouteChange = () => animateManual('horizontal', 1)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)

  }, [router.asPath, isFixed, ratio, router.events, animateManual])

  const vertical = letterReducer('vertical')
  const horizontal = letterReducer('horizontal')
  const regionPerc = pageRegion?.name.length ?? letters.length / letters.length
  const regionRatio = ratio === undefined ? 0 : (ratio > 1 && !isFixed && isDesktop ? 1 - ((ratio - 1) / regionPerc) : isFixed) ? 1 - ((1 + regionPerc) * ratio) : 1

  function handleMouseOver(e: React.MouseEvent<HTMLSpanElement>): void {

    const { type, target } = e;
    const nodes = target.parentNode.childNodes
    const id = target.parentNode.id

    Array.from(nodes).forEach((node: HTMLAnchorElement) => {
      const translateType = `translate${id === 'vertical' ? 'X' : 'Y'}`
      const axis = randomInt(-15, 15)
      node.style.transform = type === 'mouseenter' ? `${translateType}(${axis}%)` : `${translateType}(0%)`
    })
  }

  return (
    <div className={cn(s.container, invertedMenu && s.inverted)}>
      <div className={cn(s.back, isPageBottom && s[theme])}></div>
      <div className={s.logo}>
        <div className={s.horizontal}>
          <RegionLink id="horizontal" href="/" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOver}>
            {horizontal.map((l, idx) => <span key={idx}>{l}</span>)}
          </RegionLink>
          {pageRegion && !pageRegion?.global &&
            <Link href={`/${pageRegion?.slug}`} className={cn(s.region, horizontal.length === 0 && s.end)}>
              {pageRegion.name.substring(0, (pageRegion.name.length) * regionRatio)}
            </Link>
          }
        </div>
        <div className={s.vertical} ref={ref}>
          <RegionLink id="vertical" href="/" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOver}>
            {vertical.map((l, idx) => <span key={idx}>{l}</span>)}
          </RegionLink>
          {horizontal.length > 0 &&
            <div className={s.space}></div>
          }
        </div>
      </div>
    </div>
  )
}