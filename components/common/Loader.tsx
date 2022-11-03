import styles from './Loader.module.scss'

export default function Loader({message}){
  return (
    <div className={styles.container}>
      {message}
    </div>
  )
}