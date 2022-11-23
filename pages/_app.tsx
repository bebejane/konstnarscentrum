import '/lib/styles/index.scss'
import { Layout } from '/components';
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps }) {

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
