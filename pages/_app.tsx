import '/lib/styles/index.scss'
import Menu from "/components/nav/Menu";
import { Layout } from '/components';
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps }) {

  const { menu, session } = pageProps;

  return (
    <SessionProvider session={session}>
      <Layout menu={menu || []} title="Page title">
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default App;
