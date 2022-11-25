import s from './CardContainer.module.scss'
import { chunkArray } from '/lib/utils'
import useDevice from '/lib/hooks/useDevice'

export type Props = {
  children?: React.ReactNode | React.ReactNode[]
}

export default function CardContainer({ children }: Props) {
  const { isMobile } = useDevice()
  const cards = chunkArray(Array.isArray(children) ? children : [children], isMobile ? 2 : 3) as [React.ReactNode[]]

  return (
    <ul className={s.container}>
      {cards.map((row, idx) => {
        return (
          <>
            {row.map(el => el)}
            <hr key={idx} />
          </>
        )
      })}
    </ul>
  )
}