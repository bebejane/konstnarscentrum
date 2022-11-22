import styles from "./index.module.scss";
import { GetStaticProps } from "next";
import withGlobalProps from "/lib/withGlobalProps";
import { AllAboutsDocument } from "/graphql";
import Link from "next/link";

type AboutsProps = {
	abouts: AboutRecord[]
}

export default function Abouts({ abouts }: AboutsProps) {

	return (
		<div className={styles.container}>
			<h1>Abouts</h1>
			{abouts.map(({ slug, title }, idx) =>
				<Link key={idx} href={`/about/${slug}`}>
					{title}
				</Link>
			)}
		</div>
	);
}


export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllAboutsDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});

export const config = {
	//runtime: 'experimental-edge'
}