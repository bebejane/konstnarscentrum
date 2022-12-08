import '/lib/styles/index.scss'
import { Layout } from '/components';
import { SessionProvider } from "next-auth/react"
import { RegionProvider } from '/lib/context/region';
import { getCookie } from 'cookies-next';

function App({ Component, pageProps, router }) {

  const { menu, footer, session, region } = pageProps;

  return (
    <SessionProvider session={session}>
      <RegionProvider value={region}>
        <Layout menu={menu || []} footer={footer} title="Page title">
          <Component {...pageProps} />
        </Layout>
      </RegionProvider>
    </SessionProvider>
  );
}

export default App;
