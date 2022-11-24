import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllCommissionsDocument, CommissionDocument } from "/graphql";
import Link from "next/link";
import { Image as DatoImage } from 'react-datocms'


export type Props = {
	commissions: CommissionRecord[]
}

export default function RegionHome({ commissions }: Props) {

	return (
		<>
			<header>
				<h1>Uppdragsarkiv<sup className="amount">19</sup></h1>
				<nav className={styles.filter}>
					<ul>
						<li>Alla</li>
						<li>Skola</li>
						<li>Offentlig</li>
					</ul>
					<div className={styles.background}></div>
				</nav>
			</header>
			<div className={styles.container}>
				{commissions.map(({ title, slug, image }, idx) =>
					<Link className={styles.thumb} key={idx} href={`/anlita-oss/uppdrag/${slug}`}>
						<DatoImage
							data={image.responsiveImage}
							className={styles.image}
							fadeInDuration={0}
						/>
						<span class="mid">{title}</span>
					</Link>
				)}
				<hr></hr>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllCommissionsDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
