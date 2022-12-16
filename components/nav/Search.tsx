import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import s from './Search.module.scss'
import SearchIcon from '/public/images/search.svg'
import CloseIcon from '/public/images/close.svg'
import { Image } from 'react-datocms'

export type Props = {

}

export default function Search({ }: Props) {

  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<any | undefined>()
  const [error, setError] = useState<Error | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [query, setQuery] = useState<string | undefined>()
  const ref = useRef<HTMLInputElement | undefined>()

  useEffect(() => {

    setLoading(true)
    setResults(undefined)

    const variables = {
      type: 'site',
      query: query ? `${query.split(' ').filter(el => el).join('|')}` : undefined
    };

    if (!Object.keys(variables).filter(k => variables[k] !== undefined).length)
      return setResults(undefined)

    fetch('/api/search', {
      body: JSON.stringify(variables),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async (res) => setResults(await res.json()))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))

  }, [query, setResults])

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults(undefined)
      ref.current?.focus()

    }
  }, [open])


  return (
    <>
      <nav className={cn(s.search, open && s.open)}>
        <div className={s.wrap} onClick={() => setOpen(!open)}>
          <SearchIcon />
        </div>
      </nav >

      <div className={cn(s.searchBar, open && s.show, query && s.full)}>
        {query &&
          <div className={s.results}>
            <nav>Sök</nav>
            <h2>Sökresultat: &quot;{query}&quot;</h2>
            <div className={s.matches}>
              {results ?
                Object.keys(results).map((type, idx) => {
                  const items = results[type]
                  return (
                    <>
                      <h5>{type}</h5>
                      <ul>
                        {items?.map(({ title, text, image }, i) =>
                          <li key={i}>
                            <div>
                              <h4>{title}</h4>
                              <p class="intro">{text}</p>
                            </div>
                            {image &&
                              <Image className={s.image} data={image.responsiveImage} />
                            }
                          </li>
                        )}
                      </ul>
                    </>
                  )
                })
                :
                loading ?
                  <>Söker...</>
                  :
                  <>Inget hittades...</>
              }
            </div>
          </div>
        }
        <div className={s.bar}>
          <div className={s.icon}>
            <SearchIcon />
          </div>
          <input
            ref={ref}
            type="text"
            placeholder="Sök..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className={s.icon} onClick={() => setOpen(!open)}>
            <CloseIcon />
          </div>
        </div>
      </div>
    </>
  )
}
