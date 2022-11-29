import s from './MetaSection.module.scss'
import { isEmail } from '/lib/utils'

export type Props = {
  items: {
    title: string
    value: string
  }[]
}

export default function MetaSection({ items = [] }: Props) {
  return (
    <section className={s.meta}>
      <ul className="small">
        {items.map(({ title, value }, idx) =>
          <li key={idx}>
            <span>{title}:</span>
            {isEmail(value) ? <a href={`mailto:${value}`}>Email</a> : <>{value}</>}
          </li>
        )}
      </ul>
    </section>
  )
}
