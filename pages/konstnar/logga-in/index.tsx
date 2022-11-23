import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import Link from "next/link";
//import {  } from "/graphql";

export type Props = {

}

export default function Login({ }: Props) {

	return (
		<div className={styles.container}>
			Login
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
