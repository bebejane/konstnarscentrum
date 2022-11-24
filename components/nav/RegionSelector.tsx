import s from './RegionSelector.module.scss'
import cn from 'classnames'
import { regions } from "/lib/region";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStore, shallow } from '/lib/store';

const defaultRegion: Region = { id: 'riks', name: 'Riks', slug: '/', roleId: '', tokenId: '' }

export default function RegionSelector({ }) {

  const router = useRouter()
  const [region, setRegion] = useStore((state) => [state.region, state.setRegion], shallow)
  const [open, setOpen] = useState(false)

  const createSlug = (regionSlug: string) => {
    if (regionSlug === '/') return '/'
    const paths = router?.asPath.split('/').slice(1);
    const currentRegion = regions.find(el => el.slug === paths[0]);
    return !currentRegion ? `/${regionSlug}` : `/${regionSlug}/${paths.slice(1).join('/')}`
  }

  useEffect(() => {
    const slug = router?.asPath.split('/')[1];
    setRegion(regions.find(d => d.slug === slug))
    setOpen(false)
  }, [router, setRegion])

  return (
    <div className={s.container}>
      <div className={cn(s.selected, open && s.open)} onClick={() => setOpen(!open)}>
        {region?.name || 'Region'} <img src="/images/caret.png" />
      </div>
      <ul className={cn(open && s.show)}>
        {[defaultRegion, ...regions].map((d, idx) =>
          <li key={idx} data-slug={d.slug} data-selected={region?.id === d.id}>
            <Link href={createSlug(d.slug)} onClick={() => setOpen(true)}>
              {d.name}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}