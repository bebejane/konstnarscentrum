import styles from "./index.module.scss";
import Link from "next/link"
import { frontPageController } from "/controllers";

export default function Home(data) {
	return (
    <div className={styles.container}>
      <div><h2>Konstnärs Centrum</h2></div>
      <div><Link href={"/member"}>Medlemmar</Link></div>
    </div>
  )
}

export async function getServerSideProps() {
	
	const frontPage  = await frontPageController.get();	
	return {
		props: {
			...frontPage,
		}
		//revalidate:30
	}
}