import styles from "./index.module.scss";
import Link from "next/link"

export default function Home(data) {
	return (
    <div className={styles.container}>
      <div><h2>Konstnärscentrum</h2></div>
      <div><Link href={"/member"}>Medlemmar</Link></div>
    </div>
  )
}

export async function getStaticProps() {
	
	return {
		props: {data:['dsfdasd']},
		revalidate:30
	}
}