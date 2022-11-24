import s from './Logo.module.scss'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { isServer, breakpoints } from '/lib/utils'
import Link from 'next/link'
import { useMediaQuery } from 'usehooks-ts'
import { useStore } from '/lib/store'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const letters = ['K', 'O', 'N', 'S', 'T', 'N', 'Ä', 'R', 'S', 'C', 'E', 'N', 'T', 'R', 'U', 'M']

export type Props = {
  disabled: boolean
}

export default function Logo({ disabled }: Props) {

  const router = useRouter()

  const [showMenuMobile, setShowMenuMobile, region] = useStore((state) => [state.showMenuMobile, state.setShowMenuMobile, state.region])
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)
  const { scrolledPosition, viewportHeight } = useScrollInfo()
  const [manualMode, setManualMode] = useState(false)
  const [ratio, setRatio] = useState(0)

  const animateManual = useCallback((dir: 'horizontal' | 'vertical') => {
    let r = ratio;

    setManualMode(true)
    const interval = setInterval(() => {
      if (r > 1 || r < 0) {
        setRatio(r > 1 ? 1 : 0)
        return clearInterval(interval)
      }
      setRatio(dir === 'horizontal' ? r += 0.1 : r -= 0.1)
    }, 30)
  }, [setManualMode, ratio])

  const letterReducer = (direction: 'horizontal' | 'vertical') => {
    const l = letters.length;

    if (disabled) {
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

  const vertical = letterReducer('vertical')
  const horizontal = letterReducer('horizontal')

  useEffect(() => {
    if (manualMode) return
    setRatio(Math.max(0, Math.min(scrolledPosition / viewportHeight, 1)))
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
  //console.log(region);

  return (
    <div className={s.logo}>
      <div className={s.vertical}>
        <Link href="/">
          {vertical.map((l, i) => <>{l}</>)}
        </Link>
        {horizontal.length > 0 &&
          <span className={s.space}>{letters[vertical.length]}</span>
        }
      </div>
      <div className={s.horizontal}>
        <Link href="/">
          {horizontal.map((l, i) => <>{l}</>)}
        </Link>
        <span className={s.region}>{region?.name}</span>
      </div>
    </div>
  )
}