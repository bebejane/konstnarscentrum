import s from './RegionSelector.module.scss'
import cn from 'classnames'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useRegion } from '/lib/context/region';
import { setCookie, getCookie } from 'cookies-next';
import { useStore } from '/lib/store';
import { useOutsideClickRef } from 'rooks';
import { regions } from '/lib/region'

export default function RegionSelector({ }) {

  const region = useRegion()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [showMenu] = useStore((state) => [state.showMenu])
  const [ref] = useOutsideClickRef(() => setOpen(false))

  const handleClick = (e) => {
    const region = regions.find(el => e.target.href.includes(el.slug))
    setCookie('region', region.slug)
    setOpen(false)
  }

  useEffect(() => {
    setOpen(false)
  }, [router])

  useEffect(() => {
    if (open && !showMenu)
      setOpen(false)
  }, [showMenu, open]
  )
  return (
    <div className={s.container} ref={ref}>
      <div className={cn(s.selected, open && s.open)} onClick={() => setOpen(!open)}>
        {!region || region.global ? 'Välj region' : region.name} <img src="/images/caret.png" />
      </div>
      <div className={cn(s.compass, open && s.show)} >
        <div>
          <span></span>
          <span><Link href="/nord" onClick={handleClick}>Nord</Link></span>
          <span></span>
        </div>
        <div>
          <span><Link href="/vast" onClick={handleClick}>Väst</Link></span>
          <span><Link href="/mitt" onClick={handleClick}>Mitt</Link></span>
          <span><Link href="/ost" onClick={handleClick}>Öst</Link></span>
        </div>
        <div>
          <span></span>
          <span><Link href="/syd" onClick={handleClick}>Syd</Link></span>
          <span></span>
        </div>
        <div className={s.all}><Link href="/" onClick={handleClick}>Alla</Link></div>
      </div>
    </div>
  )
}