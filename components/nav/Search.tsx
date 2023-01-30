import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import s from './Search.module.scss'
import SearchIcon from '/public/images/search.svg'
import CloseIcon from '/public/images/close.svg'
import { KCImage as Image } from '/components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Loader from '/components/common/Loader'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import useStore from '/lib/store'

export type Props = {

}

export default function Search({ }: Props) {

  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useStore((state) => [state.showSearch, state.setShowSearch])
  const [results, setResults] = useState<any | undefined>()
  const [error, setError] = useState<Error | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [query, setQuery] = useState<string | undefined>('')
  const ref = useRef<HTMLInputElement | undefined>()

  useEffect(() => {

    const variables = {
      type: 'site',
      query: query ? `${query.split(' ').filter(el => el).join('|')}` : undefined
    };

    if (!Object.keys(variables).filter(k => variables[k] !== undefined).length)
      return

    setResults(undefined)
    setLoading(true)

    fetch('/api/search', {
      body: JSON.stringify(variables),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const results = await res.json()
          setResults(results)
        } else
          setError(new Error('error in search'))
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))

  }, [query, setResults])

  useEffect(() => {
    if (open) {
      ref.current?.focus()
    } else {
      setResults(undefined)
      setQuery('')
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [router])

  useEffect(() => {
    setShowSearch(query?.length > 0)
  }, [query])



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
            <header>
              <nav>Sökresultat: &quot;{query}&quot;</nav>
            </header>
            <div className={s.matches}>
              {results && Object.keys(results).length > 0 ?
                Object.keys(results).map((type, idx) =>
                  <ul key={idx}>
                    {results[type]?.map(({ category, title, text, image, slug }, i) =>
                      <li key={i}>
                        <div className={s.text}>
                          <h5>{category}</h5>
                          <h4>
                            <Link href={slug}>{title}</Link>
                          </h4>
                          <Markdown>{text}</Markdown>
                        </div>
                        {image &&
                          <figure>
                            <Link href={slug}>
                              <Image
                                className={s.image}
                                data={image.responsiveImage}
                                objectFit="contain"
                              />
                            </Link>
                          </figure>
                        }
                      </li>
                    )}
                  </ul>

                )
                :
                loading ?
                  <div className={s.loader}>
                    <Loader invert={true} />
                  </div>
                  : <>Inga träffar för: &quot;{query}&quot;</>
              }
              {error &&
                <div className={s.error}>
                  <p>
                    {typeof error === 'string' ? error : error.message}
                  </p>
                  <button onClick={() => setError(undefined)}>Stäng</button>
                </div>
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
          <div className={cn(s.close, s.icon)} onClick={() => setOpen(!open)}>
            <CloseIcon />
          </div>
        </div>
      </div>
    </>
  )
}
