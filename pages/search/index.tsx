import s from "./index.module.scss";
import { CardContainer, Card, Thumbnail, Loader } from "/components";
import { useEffect, useState } from "react";
import { recordToSlug } from "/lib/utils";

export default function SiteSearch() {

  const [results, setResults] = useState<any[] | undefined>()
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
      .then(async (res) => setResults((await res.json()).members))
      .catch((err) => setError(err))
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
            {results.map((record) =>
              <Card key={record.id}>
                <Thumbnail
                  slug={recordToSlug(record)}
                  image={record.image}
                  title={record.firstName}
                />
              </Card>
            )}
          </CardContainer>
        </>
      }
      {loading && <Loader />}
    </div>
  );
}

