import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import SignIn from "/components/auth/SignIn";
import SignOut from "/components/auth/SignOut";
import { ClientSafeProvider, getCsrfToken, getProviders, useSession } from "next-auth/react";

export type Props = {
	csrfToken: string,
	providers: ClientSafeProvider[]
}

export default function Login({ csrfToken, providers }: Props) {

	const { data, status } = useSession()

	return (
		<div className={styles.container}>
			<h1>Logga in</h1>
			<SignIn csrfToken={csrfToken} providers={providers} />
		</div>
	);
}

export const getServerSideProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
	const res = await Promise.all([getCsrfToken(context), getProviders()]);
	const csrfToken = res[0]
	const providers = res[1]

	return {
		props: {
			...props,
			csrfToken
		}
	};
});
