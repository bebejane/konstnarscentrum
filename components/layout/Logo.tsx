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

const letters = ['K', 'O', 'N', 'S', 'T', 'N', 'Ä', 'R', 'S', 'C', 'E', 'N', 'T', 'R', 'U', 'M']

export type Props = {
  fixed: boolean
}

export default function Logo({ fixed }: Props) {

  const ref = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()
  const region = useRegion()
  const [showMenuMobile, setShowMenuMobile] = useStore((state) => [state.showMenuMobile, state.setShowMenuMobile])
  const { isMobile } = useDevice()
  const { scrolledPosition, viewportHeight, documentHeight } = useScrollInfo()
  const [manualMode, setManualMode] = useState(false)
  const [ratio, setRatio] = useState(0)
  const [height, setHeight] = useState(0)

  const animateManual = useCallback((dir: 'horizontal' | 'vertical') => {

    setManualMode(true)

    let maxR = 1 + (region.name.length / letters.length)
    let r = ratio;

    const interval = setInterval(() => {
      if (r > maxR || r < 0) {
        setRatio(r > maxR ? maxR : 0)
        return clearInterval(interval)
      }
      setRatio(dir === 'horizontal' ? r += 0.1 : r -= 0.1)
    }, 30)
  }, [setManualMode, ratio, region])

  const letterReducer = (direction: 'horizontal' | 'vertical') => {
    const l = letters.length;

    if (fixed || (isMobile && !manualMode)) {
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
    if (manualMode)
      return

    const footer = document.getElementById('footer') as HTMLDivElement
    const footerThreshhold = documentHeight - footer.clientHeight
    const maxR = 1 + (region.name.length / letters.length)
    let r;

    if ((scrolledPosition + viewportHeight) > footerThreshhold)
      r = (documentHeight - ((scrolledPosition + viewportHeight))) / viewportHeight;
    else
      r = Math.max(0, Math.min(scrolledPosition / viewportHeight, maxR))

    setRatio(r)

  }, [scrolledPosition, viewportHeight, documentHeight, setRatio, manualMode, height])

  useEffect(() => {
    animateManual(!showMenuMobile ? 'vertical' : 'horizontal')
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


  const vertical = letterReducer('vertical')
  const horizontal = letterReducer('horizontal')
  const regionPerc = (region.name.length / letters.length)
  const regionRatio = ratio > 1 && !fixed ? 1 - ((ratio - 1) / regionPerc) : fixed ? 1 - ((1 + regionPerc) * ratio) : 1

  return (
    <div className={s.container}>
      <div className={s.logo} >
        <div className={s.vertical} ref={ref}>
          <Link href="/">
            {vertical.map((l, i) => l)}
          </Link>
          {horizontal.length > 0 &&
            <span className={s.space}>{letters[vertical.length]}</span>
          }
        </div>
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
      </div>
    </div>
  )
}