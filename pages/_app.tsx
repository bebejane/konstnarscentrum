import '/lib/styles/index.scss'
import { Layout } from '/components';
import { SessionProvider } from "next-auth/react"
import { RegionProvider } from '/lib/context/region';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';
import { sv } from 'date-fns/locale'
import { PageProvider, type PageProps } from '/lib/context/page';
import setDefaultOptions from 'date-fns/setDefaultOptions';

setDefaultOptions({ locale: sv })

function App({ Component, pageProps }) {

  const router = useRouter()
  const page = (Component.page || {}) as PageProps

  const { menu, footer, regions, session, site } = pageProps;
  const [region, setRegion] = useState(pageProps.region)

  useEffect(() => {
    const regionFromCookie = regions.find(({ slug }) => slug === getCookie('region'))
    if (regionFromCookie)
      setRegion(regionFromCookie)
  }, [router])


  return (
    <>
      <DefaultDatoSEO site={site} path={router.pathname} siteTitle="Konstnärscentrum" />
      <SessionProvider session={session}>
        <PageProvider value={page}>
          <RegionProvider value={region}>
            <Layout title="Page title" menu={menu || []} footer={footer} regions={regions}>
              <Component {...pageProps} />
            </Layout>
          </RegionProvider>
        </PageProvider>
      </SessionProvider>
    </>
  );
}

export default App;
