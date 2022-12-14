import '/lib/styles/index.scss'
import { Layout } from '/components';
import { SessionProvider } from "next-auth/react"
import { RegionProvider } from '/lib/context/region';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { regions } from '/lib/region';
import { useRouter } from 'next/router';
import setDefaultOptions from 'date-fns/setDefaultOptions';
import { sv } from 'date-fns/locale'

setDefaultOptions({ locale: sv })

function App({ Component, pageProps }) {

  const router = useRouter()
  const { menu, footer, regions, session } = pageProps;
  const [region, setRegion] = useState(pageProps.region)

  useEffect(() => {
    const regionFromCookie = regions.find(({ slug }) => slug === getCookie('region'))
    if (regionFromCookie)
      setRegion(regionFromCookie)
  }, [router])

  return (
    <SessionProvider session={session}>
      <RegionProvider value={region}>
        <Layout
          title="Page title"
          menu={menu || []}
          footer={footer}
          regions={regions}
        >
          <Component {...pageProps} />
        </Layout>
      </RegionProvider>
    </SessionProvider>
  );
}

export default App;
