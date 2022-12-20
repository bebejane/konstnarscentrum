import s from './Breadcrumbs.module.scss'
import cn from 'classnames'
import { useRegion } from '/lib/context/region';
import { usePage } from '/lib/context/page';
import { useRouter } from 'next/router';
import { RegionLink } from '/components'

export type Props = {
  title?: string
  show: boolean
}

export default function Breadcrumbs({ title, show }: Props) {

  const router = useRouter()
  const region = useRegion()
  const { crumbs } = usePage()

  return (
    <div className={cn(s.container, show && s.show)}>
      {[{ slug: '', title: 'Hem', }, ...crumbs].map(({ slug, title }, idx) =>
        <>
          <RegionLink
            key={idx}
            href={`/${slug}`}
          >{title}</RegionLink>&nbsp;›&nbsp;
        </>
      )}{title && `${title}`}
    </div>
  )
}