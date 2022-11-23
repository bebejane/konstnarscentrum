import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { isServer } from '/lib/utils'
import styles from './Logo.module.scss'

const letters = ['K', 'O', 'N', 'S', 'T', 'N', 'Ä', 'R', 'S', 'C', 'E', 'N', 'T', 'R', 'U', 'M']

export default function Logo({ disabled }) {

  const { scrolledPosition, viewportHeight, isPageBottom, isPageTop, isScrolledUp } = useScrollInfo()
  const ratio = Math.min(scrolledPosition / viewportHeight, 1)
  const vertical = letters.filter((el, idx) => (idx / letters.length) < ratio || disabled)
  const horizontal = letters.filter((el, idx) => ((idx / letters.length) >= ratio || isServer) && !disabled)

  return (
    <div className={styles.logo}>
      <div className={styles.vertical}>
        {vertical.map((l, i) => <>{l}</>)}
        {horizontal.length > 0 &&
          <span className={styles.space}>X</span>
        }
      </div>
      <div className={styles.horizontal}>
        {horizontal.map((l, i) => <>{l}</>)}
      </div>
    </div>
  )
}