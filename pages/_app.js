import { SessionProvider } from "next-auth/react"
import '/styles/globals.scss'

function App({ Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
