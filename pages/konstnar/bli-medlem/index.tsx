import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { regions } from "/lib/region";
import { apiQuery } from "dato-nextjs-utils/api";
import Link from "next/link";
import { Apply } from "/components";

export type Props = {

}

export default function Member({ }: Props) {

	return (
		<div className={styles.container}>
			<h1>Bli medlem</h1>
			<Apply regions={regions.filter(({ global }) => !global)} />
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
