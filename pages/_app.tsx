import '/lib/styles/index.scss'
import { Menu } from "/components";
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <Menu message={''}/>
      <main>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default App;
