import s from './404.module.scss'

export default function FiveZeroZero() {
  return (
    <div className={s.container}>
      <h1>500 - Server-side error occurred</h1>
      <a href="/">
        Go back home
      </a>
    </div>
  )
}