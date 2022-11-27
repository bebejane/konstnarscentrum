import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import SignOut from "/components/auth/SignOut";
import { requireAuthentication } from "/lib/auth";
import { ClientSafeProvider, getCsrfToken, useSession } from "next-auth/react";

export type Props = {
	csrfToken: string,
	providers: ClientSafeProvider[]
}

export default function LogOut({ csrfToken, providers }: Props) {

	const { data, status } = useSession()

	return (
		<div className={styles.container}>
			<h1>Konto</h1>
			<SignOut />
		</div>
	);
}

export const getServerSideProps: GetStaticProps = requireAuthentication(withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
	const res = await getCsrfToken(context)
	const csrfToken = res[0]

	return {
		props: {
			...props,
			csrfToken
		}
	};
}));
