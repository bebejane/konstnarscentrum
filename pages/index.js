import styles from "./index.module.scss";
import Link from "next/link"

export default function Home(props) {
	return (
    <div className={styles.container}>
      Home
    </div>
  )
}

export async function getStaticProps() {
	
	return {
		props: {},
		revalidate:30
	}
}