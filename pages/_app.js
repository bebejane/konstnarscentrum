import Menu from "/components/common/Menu";
import { SessionProvider } from "next-auth/react"
import '/styles/index.scss'

function App({ Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <Menu/>
      <main>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default App;
