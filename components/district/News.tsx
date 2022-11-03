import styles from './index.module.scss'

export default function News({news}){
  
  return (
    <div className={styles.container}>
      <h2>News</h2>
      {news.length > 0 ? news.map(({header, body, image}) => 
        <p>
          {header}<br/>
        </p>
      ) : <span>No news...</span>}
    </div>
  )
}