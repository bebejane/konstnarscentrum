import s from './FilterBar.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'


type FilterOption = {
  id: string,
  label: string
}

type Props = {
  options: FilterOption[]
  onChange: (value: string) => void
}

export default function FilterBar({ options = [], onChange }: Props) {

  const [selected, setSelected] = useState<FilterOption | undefined>()

  useEffect(() => {
    onChange(selected?.id)
  }, [selected, onChange])

  return (
    <nav className={s.filter}>
      <ul>
        <li>Visa:</li>
        {options.map((opt, idx) =>
          <li
            key={idx}
            onClick={() => setSelected(selected?.id === opt.id ? undefined : opt)}
            className={cn(selected?.id === opt.id && s.selected)}
          >
            {opt.label}
          </li>
        )}
      </ul>
      <div className={s.background}></div>
    </nav>
  )
}

