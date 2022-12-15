import Link from 'next/link'
import withGlobalProps from '/lib/withGlobalProps'
import { GetStaticProps } from 'next'

export default function FourOhFour() {
  return (
    <div className={'errorPageContainer'}>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        Go back home
      </Link>
    </div>
  )
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  return {
    props,
    revalidate
  }
})