import s from "./index.module.scss";
import { CardContainer, Card, Thumbnail, Loader } from "/components";
import { useEffect, useState } from "react";

export default function SiteSearch() {

  const [results, setResults] = useState<any[] | undefined>()
  const [error, setError] = useState<Error | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [query, setQuery] = useState<string | undefined>()

  useEffect(() => {

    const variables = {
      type: 'site',
      query: query ? `${query.split(' ').filter(el => el).join('|')}` : undefined
    };

    if (!Object.keys(variables).filter(k => variables[k] !== undefined).length)
      return setResults(undefined)

    setLoading(true)

    fetch('/api/search', {
      body: JSON.stringify(variables),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async (res) => setResults((await res.json()).members))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))

  }, [query, setResults])

  return (
    <div className={s.container}>
      <h1>Site search</h1>
      <form>
        <input
          id="search"
          name="search"
          placeholder="Search..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {results &&
        <>
          <h2>Sök resultat</h2>
          {results.length === 0 && <>Hittadet inget...</>}
          <CardContainer columns={3} className={s.results}>
            {results.map(({ __typename, id }) =>
              <Card key={id}>
                {__typename}: {id}
              </Card>
            )}
          </CardContainer>
        </>
      }
      {loading && <Loader />}
    </div>
  );
}

