import s from './ThumbnailContainer.module.scss'
import { chunkArray, breakpoints } from '/lib/utils'
import { useMediaQuery } from 'usehooks-ts'


export type Props = {
  children?: React.ReactNode | React.ReactNode[]
}

export default function ThumbnailContainer({ children }: Props) {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)
  const thumbs = chunkArray(Array.isArray(children) ? children : [children], isMobile ? 2 : 3) as [React.ReactNode[]]

  return (
    <div className={s.container}>
      {thumbs.map((row, idx) => {
        return (
          <>
            {row.map(el => el)}
            <hr key={idx} />
          </>
        )
      })}
    </div>
  )
}