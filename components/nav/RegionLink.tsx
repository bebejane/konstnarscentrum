import Link from 'next/link'
import { useRegion } from '/lib/context/region';

export type Props = {
  [key: string]: any
  href: string
  regional?: boolean
  externa?: boolean
}

export default function RegionLink(props: Props) {

  const region = useRegion()
  const isRegional = props.regional === false ? false : true
  const href = (region && isRegional && !props.external && !props.href.toLowerCase().startsWith('http')) ? `/${region.slug}${props.href}` : props.external && !props.href.startsWith('http') ? `https://${props.href}` : props.href

  return (
    <Link {...props} href={href} regional={undefined} external={undefined} >
      {props.children}
    </Link >
  )
}