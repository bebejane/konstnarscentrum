import s from './RegionSelector.module.scss'
import cn from 'classnames'
import { regions } from "/lib/region";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const defaultDistict = { id: 'riks', name: 'Riks', slug: '/' }

export type Region = {
  id: string,
  name: string,
  slug: string,
}

export default function RegionSelector({ }) {

  const router = useRouter()
  const [selected, setSelected] = useState<Region>(defaultDistict)
  const [open, setOpen] = useState(false)

  const handleClick = (e) => setRegion(e.target.dataset.slug)
  const setRegion = (slug: string) => {
    setSelected([...regions, defaultDistict].find(d => d.slug === slug))
    setOpen(false)
  }

  useEffect(() => {
    setRegion(router?.asPath.split('/')[1])
  }, [router, setSelected])

  return (
    <div className={s.container}>
      <div className={cn(s.selected, open && s.open)} onClick={() => setOpen(!open)}>
        {selected?.name || 'Region'} <img src="/images/caret.png" />
      </div>
      <ul className={cn(open && s.show)}>
        {[defaultDistict, ...regions].map((d, idx) =>
          <li key={idx} data-slug={d.slug} data-selected={selected?.id === d.id}>
            <Link href={`/${d.slug}`} onClick={handleClick}>
              {d.name}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}