import Link from 'next/link'
import { useRegion } from '/lib/context/region';

export default function RegionLink(props: any) {

  const region = useRegion()
  const isRegional = props.regional === true ? true : false
  const href = region && isRegional ? `/${region.slug}${props.href}` : props.href

  return (
    <Link {...props} href={href}>
      {props.children}
    </Link>
  )
}