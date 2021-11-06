import styles from "./index.module.scss";
import Link from "next/link"

export default function Region({region}) {
	return (
    <div className={styles.container}>
      {region}
    </div>
  )
}

export async function getServerSideProps(req) {
  
  const {region} = req.query;
	return {
		props: {region}
	}
}