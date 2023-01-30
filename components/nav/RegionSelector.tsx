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
import { usePage } from '/lib/context/page'

export type Props = {

}

export default function RegionSelector({ }: Props) {

  const region = useRegion()
  const page = usePage()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [showMenu] = useStore((state) => [state.showMenu])
  const [ref] = useOutsideClickRef(() => setOpen(false))

  const handleClick = (e) => {

    const url = new URL(e.target.href)
    const region = regions.find(el => url.pathname.startsWith(`/${el.slug}`) || (url.pathname === `/` && el.global))
    setCookie('region', region?.slug)
    setOpen(false)
  }

  useEffect(() => {
    setOpen(false)
  }, [router])

  useEffect(() => {
    if (open && !showMenu)
      setOpen(false)
  }, [showMenu, open])

  const pageSlug = page.regional ? `${router.asPath.substring(router.asPath.indexOf('/', 1))}` : ''

  return (
    <div className={s.container} ref={ref}>
      <div className={cn(s.selected, open && s.open)} onClick={(e) => setOpen(!open)}>
        {!region || region.global ? 'Välj region' : region.name} <img src="/images/caret.png" />
      </div>
      <div className={cn(s.compass, open && s.show)} >
        <div>
          <span></span>
          <span><Link href={`/nord${pageSlug}`} onClick={handleClick}>Nord</Link></span>
          <span></span>
        </div>
        <div className={s.mid}>
          <span><Link href={`/vast${pageSlug}`} onClick={handleClick}>Väst</Link></span>
          <span><Link href={`/mitt${pageSlug}`} onClick={handleClick}>Mitt</Link></span>
          <span><Link href={`/ost${pageSlug}`} onClick={handleClick}>Öst</Link></span>
        </div>
        <div>
          <span></span>
          <span><Link href={`/syd${pageSlug}`} onClick={handleClick}>Syd</Link></span>
          <span></span>
        </div>
        <div className={s.all}><Link href="/" onClick={handleClick}>Alla</Link></div>
      </div>
    </div>
  )
}