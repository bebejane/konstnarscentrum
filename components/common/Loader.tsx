import styles from './Loader.module.scss'

type Props = {
  message?: string
}

export default function Loader({message}: Props){
  return (
    <div className={styles.container}>
      {message}
    </div>
  )
}