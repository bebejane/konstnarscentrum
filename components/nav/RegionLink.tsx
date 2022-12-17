import Link from 'next/link'
import { useRegion } from '/lib/context/region';

export type Props = {
  [key: string]: any
  regional?: boolean
}

export default function RegionLink(props: Props) {

  const region = useRegion()
  const isRegional = props.regional === false ? false : true
  const href = (region && isRegional && !props.href.toLowerCase().startsWith('http')) ? `/${region.slug}${props.href}` : props.href

  return (
    <Link {...{ props, regional: undefined }} href={href} >
      {props.children}
    </Link >
  )
}