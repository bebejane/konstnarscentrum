import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import SignIn from "/components/auth/SignIn";
import { ClientSafeProvider, getCsrfToken, getProviders, useSession } from "next-auth/react";
import { RevealText } from "/components";

export type Props = {
	csrfToken: string,
	providers: ClientSafeProvider[]
}

export default function Login({ csrfToken, providers }: Props) {

	const { data, status } = useSession()

	return (
		<div className={styles.container}>
			<h1><RevealText>Logga in</RevealText></h1>
			<p className="intro">Här kan du som är medlem logga in och redigera din portfolio.</p>
			<SignIn csrfToken={csrfToken} providers={providers} />
			<span className="small">Har du glömt ditt lösenord? Återställ här.</span>
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
