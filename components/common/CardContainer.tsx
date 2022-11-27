import s from './CardContainer.module.scss'
import cn from 'classnames'
import { chunkArray } from '/lib/utils'
import useDevice from '/lib/hooks/useDevice'

export type Props = {
  children?: React.ReactNode | React.ReactNode[],
  columns: 2 | 3
}

export default function CardContainer({ children, columns = 3 }: Props) {

  const { isMobile } = useDevice()
  const cards = chunkArray(Array.isArray(children) ? children : [children], isMobile ? 1 : columns) as [React.ReactNode[]]

  console.log(cards);

  return (
    <ul className={cn(s.container, columns === 2 && s.two, columns === 3 && s.three)}>
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