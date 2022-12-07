import s from './RegionSelector.module.scss'
import cn from 'classnames'
import { regions } from "/lib/region";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useRegion } from '/lib/context/region';

export default function RegionSelector({ }) {

  const region = useRegion()
  const router = useRouter()
  const [open, setOpen] = useState(false)

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
            <Link href={`/${!d.global ? d.slug : ''}`} onClick={() => setOpen(true)}>
              {d.name}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}