import s from './RegionSelector.module.scss'
import cn from 'classnames'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useRegion } from '/lib/context/region';
import { setCookie, getCookie } from 'cookies-next';
import { useStore } from '/lib/store';
import { useOutsideClickRef } from 'rooks';

export default function RegionSelector({ }) {

  const region = useRegion()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [showMenu] = useStore((state) => [state.showMenu])
  const [ref] = useOutsideClickRef(() => setOpen(false))

  const handleClick = (region: Region) => {
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
    <div className={s.container}>
      <div className={cn(s.selected, open && s.open)} onClick={() => setOpen(!open)}>
        {!region || region.global ? 'Välj region' : region.name} <img src="/images/caret.png" />
      </div>
      {/*<ul className={cn(open && s.show)}>
        {regions.sort((a, b) => a.global ? -1 : 1).map((d, idx) =>
          <li key={idx} data-slug={d.slug} data-selected={region?.id === d.id}>
            <Link href={`/${!d.global ? d.slug : ''}`} onClick={() => handleClick(d)}>
              {d.name}
            </Link>
          </li>
        )}
        </ul>*/}
      <div className={cn(s.compass, open && s.show)} ref={ref}>
        <div>
          <span></span>
          <span><Link href="/nord">Nord</Link></span>
          <span></span>
        </div>
        <div>
          <span><Link href="/vast">Väst</Link></span>
          <span><Link href="/mitt">Mitt</Link></span>
          <span><Link href="/ost">Öst</Link></span>
        </div>
        <div>
          <span></span>
          <span><Link href="/syd">Syd</Link></span>
          <span></span>
        </div>
        <div className={s.all}><Link href="/">Alla</Link></div>
      </div>
    </div>
  )
}