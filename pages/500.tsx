import Link from 'next/link'
import withGlobalProps from '/lib/withGlobalProps'
import { GetStaticProps } from 'next'

export default function Custom500() {
  return (
    <div className={'errorPageContainer'}>
      <h1>500 - Server-side error occurred</h1>
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