import styles from './index.module.scss'

export default function News({news}){
  
  return (
    <div className={styles.container}>
      {news?.map(({header, body, image}) => 
        <p>
          {header}<br/>
        </p>
      )}
    </div>
  )
}