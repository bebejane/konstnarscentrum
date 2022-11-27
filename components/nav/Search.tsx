import { useState } from 'react'
import cn from 'classnames'
import s from './Search.module.scss'
import SearchIcon from '/public/images/search.svg'

export type Props = {

}

export default function Search({ }: Props) {

  const [open, setOpen] = useState(false)

  return (
    <nav className={cn(s.search, open && s.open)}>
      <div className={s.wrap} onClick={() => setOpen(!open)}>
        <SearchIcon />
      </div>
    </nav >
  )
}
