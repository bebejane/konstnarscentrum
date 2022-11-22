import s from './DistrictSelector.module.scss'
import cn from 'classnames'
import { districts } from "/lib/district";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export type District = {
  id: string,
  name: string,
  slug: string,
}
const defaultDistict = { id: 'riks', name: 'Riks', slug: '/' }

export default function DistrictSelector({ }) {

  const router = useRouter()
  const [selected, setSelected] = useState<District>(defaultDistict)
  const [open, setOpen] = useState(false)

  const handleClick = (e) => setDistrict(e.target.dataset.slug)
  const setDistrict = (slug) => {
    setSelected(districts.find(d => d.slug === slug))
    setOpen(false)
  }

  useEffect(() => {
    setDistrict(router?.asPath.split('/')[1])
  }, [router, setSelected])

  return (
    <div className={s.container}>
      <div className={s.selected} onClick={() => setOpen(!open)}>
        {selected?.name || 'Region'}
      </div>
      <ul className={cn(open && s.show)}>
        {[defaultDistict, ...districts].map((d, idx) =>
          <li key={idx} data-slug={d.slug} data-selected={selected?.id === d.id}>
            <Link href={`${d.slug}`} onClick={handleClick}>
              {d.name}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}