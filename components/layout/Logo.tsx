import s from './Logo.module.scss'
import cn from 'classnames'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { isServer } from '/lib/utils'
import Link from 'next/link'
import { useStore } from '/lib/store'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useDevice from '/lib/hooks/useDevice'
import { useRegion } from '/lib/context/region'

const letters = ['K', 'O', 'N', 'S', 'T', 'N', 'Ä', 'R', 'S', 'C', 'E', 'N', 'T', 'R', 'U', 'M']

export type Props = {
  disabled: boolean
}

export default function Logo({ disabled }: Props) {

  const router = useRouter()
  const region = useRegion()
  const [showMenuMobile, setShowMenuMobile] = useStore((state) => [state.showMenuMobile, state.setShowMenuMobile])
  const { isMobile } = useDevice()
  const { scrolledPosition, viewportHeight } = useScrollInfo()
  const [manualMode, setManualMode] = useState(false)
  const [ratio, setRatio] = useState(0)

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

    if (disabled || (isMobile && !manualMode)) {
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
    if (manualMode) return
    const maxR = 1 + (region.name.length / letters.length)
    setRatio(Math.max(0, Math.min(scrolledPosition / viewportHeight, maxR)))
  }, [scrolledPosition, viewportHeight, setRatio, manualMode])

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

  const vertical = letterReducer('vertical')
  const horizontal = letterReducer('horizontal')
  const regionRatio = ratio > 1 ? 1 - ((ratio - 1) / (region.name.length / letters.length)) : 1

  return (
    <div className={s.container}>
      <div className={s.logo}>
        <div className={s.vertical}>
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