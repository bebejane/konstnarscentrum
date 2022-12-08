import styles from './ReadMore.module.scss'
import { recordToSlug } from '/lib/utils'
import Link from 'next/link'
import cn from 'classnames'
import { RegionLink } from '/components'
import { useRegion } from '/lib/context/region'
type Props = {
  message?: string
  link: string,
  invert: boolean

}

export default function ReadMore({ message, link, invert }: Props) {

  const region = useRegion()

  return (
    <RegionLink href={recordToSlug(link, region)} className="small">
      <div className={cn(styles.square, invert && styles.invert)}></div>{message}
    </RegionLink>
  )
}