import { useEffect, useState } from 'react'
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
      setQuery(undefined)
      setResults(undefined)
    }
  }, [open])
  console.log(results);

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
            <h4>Sök</h4>
            <h2>Sökresultat: "{query}"</h2>
            {results ?
              Object.keys(results).map((type, idx) => {
                const items = results[type]
                return (
                  <>
                    <h4>{type}</h4>
                    <ul>
                      {items?.map(({ title, text, image }, i) =>
                        <li key={i}>
                          <h4>{title}</h4>
                          {text}
                          {image &&
                            <Image className={s.iamge} data={image.responsiveImage} />
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
        }
        <div className={s.bar}>
          <div className={s.icon}>
            <SearchIcon />
          </div>
          <input
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
