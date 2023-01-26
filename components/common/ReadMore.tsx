import styles from './ReadMore.module.scss'
import { recordToSlug } from '/lib/utils'
import cn from 'classnames'
import { RegionLink } from '/components'
import { useRegion } from '/lib/context/region'
import { useTheme } from 'next-themes'

type Props = {
  message?: string
  link: string,
  invert?: boolean
  regional?: boolean
}

export default function ReadMore({ message, link, invert = false, regional }: Props) {

  const region = useRegion()
  const { theme } = useTheme()

  if (!link) return null

  return (
    <RegionLink
      href={recordToSlug(link, region)}
      className={cn(styles.more, 'small')}
      regional={regional}
    >
      <div className={cn(styles.square, invert && styles.invert)} data-theme={theme}></div>
      <span data-theme={theme} className={cn(invert && styles.invert)}>{message}</span>
    </RegionLink>
  )
}