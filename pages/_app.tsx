import '/lib/styles/index.scss'
import { Layout } from '/components';
import { SessionProvider } from "next-auth/react"
import { RegionProvider } from '/lib/context/region';
import { ThemeProvider } from 'next-themes'
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';
import { sv } from 'date-fns/locale'
import { PageProvider } from '/lib/context/page';
import setDefaultOptions from 'date-fns/setDefaultOptions';
console.log('DATOCMS_ENVIRONMENT=', process.env.DATOCMS_ENVIRONMENT)
setDefaultOptions({ locale: sv })

function App({ Component, pageProps }) {

  const router = useRouter()
  const page = (Component.page || {}) as PageProps

  const { menu, footer, regions, session, site, pageTitle } = pageProps;
  const [region, setRegion] = useState(pageProps.region)

  useEffect(() => {
    const regionFromCookie = regions?.find(({ slug }) => slug === getCookie('region'))
    if (regionFromCookie)
      setRegion(regionFromCookie)
  }, [router])

  const errorCode = parseInt(router.pathname.replace('/', ''))
  const isError = !isNaN(errorCode) && (errorCode > 400 && errorCode < 600)

  if (isError)
    return <Component {...pageProps} />

  return (
    <>
      <DefaultDatoSEO site={site} path={router.pathname} siteTitle="Konstnärscentrum" />
      <SessionProvider session={session}>
        <PageProvider value={page}>
          <RegionProvider value={region}>
            <ThemeProvider defaultTheme="light" themes={['light', 'dark']} enableSystem={false}>
              <Layout title={pageTitle} menu={menu || []} footer={footer} regions={regions}>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </RegionProvider>
        </PageProvider>
      </SessionProvider>
    </>
  );
}

export default App;
