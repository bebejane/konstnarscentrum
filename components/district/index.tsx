import styles from './index.module.scss'
import News from '/components/district/News'

export default function District({district, news}){
  return (
    <div className={styles.container}>
      <News news={news}/>
    </div>
  )
}