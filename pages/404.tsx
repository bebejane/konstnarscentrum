import s from './404.module.scss'

export default function FourOhFour() {
  return (
    <div className={s.container}>
      <h1>404 - Page Not Found</h1>
      <a href="/">
        Go back home
      </a>
    </div>
  )
}