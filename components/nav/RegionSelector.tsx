import s from './RegionSelector.module.scss'
import cn from 'classnames'
import { regions } from "/lib/region";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useRegion } from '/lib/context/region';
import { setCookie, getCookie } from 'cookies-next';
import { isServer } from '/lib/utils';

export default function RegionSelector({ }) {

  const region = useRegion()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleClick = (region: Region) => {
    setCookie('region', region.slug)
    setOpen(false)
  }

  useEffect(() => {
    setOpen(false)
  }, [router])

  return (
    <div className={s.container}>
      <div className={cn(s.selected, open && s.open)} onClick={() => setOpen(!open)}>
        {!region || region.global ? 'Välj region' : region.name} <img src="/images/caret.png" />
      </div>
      <ul className={cn(open && s.show)}>
        {regions.sort((a, b) => a.global ? -1 : 1).map((d, idx) =>
          <li key={idx} data-slug={d.slug} data-selected={region?.id === d.id}>
            <Link href={`/${!d.global ? d.slug : ''}`} onClick={() => handleClick(d)}>
              {d.name}
            </Link>
          </li>
        )}
      </ul>
      <div className={s.compass}>
        <span>Nord</span>
        <div><span>Väst</span><span>Mitt</span><span>Öst</span></div>
        <span>Syd</span>
        <span className={s.all}>Alla</span>


      </div>

    </div>
  )
}