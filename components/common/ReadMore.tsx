import styles from './ReadMore.module.scss'
import { recordToSlug } from '/lib/utils'
import Link from 'next/link'
import cn from 'classnames'


type Props = {
  message?: string
}

export default function ReadMore({ message, link, invert }: Props) {
  return (
    <Link href={recordToSlug(link)} className="small"><div className={cn(styles.square, invert && styles.invert)}></div>{message}</Link>
  )
}