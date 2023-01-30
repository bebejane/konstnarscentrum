import s from './Breadcrumbs.module.scss'
import cn from 'classnames'
import { usePage } from '/lib/context/page';
import useStore from '/lib/store';
import { RegionLink } from '/components'
import React from 'react';

export type Props = {
  title?: string
  show: boolean
}

export default function Breadcrumbs({ show }: Props) {

  const page = usePage()
  const [showSearch] = useStore((state) => [state.showSearch])

  if (!page.crumbs || showSearch)
    return null

  const crumbs = [{ slug: '', title: 'Hem' }, ...page.crumbs]

  return (
    <div className={cn(s.container, 'mid', show && s.show)}>
      {crumbs.map(({ slug, title }, idx) =>
        <React.Fragment key={idx}>
          {slug === undefined ?
            <><span>{title}</span></>
            :
            <RegionLink href={`/${slug}`} regional={page.regional}>
              {title}
            </RegionLink>
          }
          {idx + 1 < crumbs.length && <>&nbsp;›&nbsp;</>}
        </React.Fragment>
      )
      }
    </div >
  )
}