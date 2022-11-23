import s from './Logo.module.scss'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { isServer } from '/lib/utils'
import Link from 'next/link'

const letters = ['K', 'O', 'N', 'S', 'T', 'N', 'Ä', 'R', 'S', 'C', 'E', 'N', 'T', 'R', 'U', 'M']

export type Props = {
  disabled: boolean
}

export default function Logo({ disabled }: Props) {

  const { scrolledPosition, viewportHeight, isPageBottom, isPageTop, isScrolledUp } = useScrollInfo()
  const ratio = Math.min(scrolledPosition / viewportHeight, 1)
  const vertical = letters.filter((el, idx) => (idx / letters.length) < ratio || disabled)
  const horizontal = letters.filter((el, idx) => ((idx / letters.length) >= ratio || isServer) && !disabled)

  return (
    <div className={s.logo}>
      <div className={s.vertical}>
        <Link href="/">
          {vertical.map((l, i) => <>{l}</>)}
        </Link>
        {horizontal.length > 0 && <span className={s.space}>{letters[vertical.length]}</span>}
      </div>
      <div className={s.horizontal}>
        <Link href="/">
          {horizontal.map((l, i) => <>{l}</>)}
        </Link>
      </div>
    </div>
  )
}