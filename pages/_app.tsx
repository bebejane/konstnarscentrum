import '/lib/styles/index.scss'
import { Layout } from '/components';
import { SessionProvider } from "next-auth/react"
import { Router } from 'next/router';

function App({ Component, pageProps, router }) {

  const { menu, footer, session } = pageProps;

  return (
    <SessionProvider session={session}>
      <Layout menu={menu || []} footer={footer} title="Page title">
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default App;
