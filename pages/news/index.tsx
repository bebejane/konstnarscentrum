import styles from "./News.module.scss";
import { newsController } from "../../lib/controllers";

import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Loader } from "/components/common";

export default function News({ news }) {
	const { data: session, status } = useSession();

	if (status === "loading") return <Loader />;
	if (status === "unauthenticated") return <Loader message={"unauthorized!"} />;

	return (
		<div className={styles.container}>
			<h1>News</h1>
			<div className={styles.news}>
				{news.map((n, idx) => (
					<div key={idx}>
						{n.header} - {format(new Date(n.createdAt), "yyyy-MM-dd HH:mm")}
					</div>
				))}
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const news = await newsController.all();
	return {
		props: {
			news,
		},
	};
}
