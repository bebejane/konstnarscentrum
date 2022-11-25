import s from './MetaSection.module.scss'

type Props = {
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
            <span>{title}:</span>{value}
          </li>
        )}
      </ul>
    </section>
  )
}
