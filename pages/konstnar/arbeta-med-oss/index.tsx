import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import Link from "next/link";
//import {  } from "/graphql";

export type Props = {

}

export default function WorkWithUs({ }: Props) {

	return (
		<div className={styles.container}>
			Arbeta med oss
		</div>
	);
}

WorkWithUs.page = { title: 'Arbeta med oss', regional: false, crumbs: [{ title: 'Arbeta med oss' }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
