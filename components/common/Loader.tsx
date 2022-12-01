import s from './Loader.module.scss'

type Props = {
  message?: string
}

export default function Loader({ message }: Props) {
  return (
    <div className={s.container}>
      Loading...
    </div>
  )
}