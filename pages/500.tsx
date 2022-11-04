import Link from 'next/link'

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