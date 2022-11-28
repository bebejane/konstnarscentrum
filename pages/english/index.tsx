import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
//import {  } from "/graphql";
//import { } from "/components";

export type Props = {

}

export default function English({ }: Props) {

	return (
		<div className={s.container}>
			English...
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	}
})