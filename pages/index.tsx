import styles from "./index.module.scss";

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