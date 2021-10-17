import TopProgressBar from "/components/common/TopProgressBar";
import { SessionProvider } from "next-auth/react"
import '/styles/globals.scss'
import "nprogress/nprogress.css";


function App({ Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <TopProgressBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
