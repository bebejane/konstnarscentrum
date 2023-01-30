import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import SignIn from "/components/account/SignIn";
import { ClientSafeProvider, getCsrfToken, getProviders, useSession } from "next-auth/react";
import { RevealText } from "/components";
import { useEffect, useState } from "react";
import { Loader } from "/components";
import Link from "next/link";

export type Props = {
	csrfToken: string,
	providers: ClientSafeProvider[]
}

export default function Login({ providers }: Props) {

	const [csrfToken, setCsrfToken] = useState<string | undefined>()
	const { data, status } = useSession()

	useEffect(() => {
		getCsrfToken().then(token => setCsrfToken(token))
	})

	return (
		<div className={s.container}>
			{status === 'loading' ?
				<Loader />
				:
				<>
					<h1><RevealText>Logga in</RevealText></h1>
					<p className="intro">Här kan du som är medlem logga in och redigera din portfolio.</p>
					<SignIn csrfToken={csrfToken} providers={providers} />
					<span className={cn('small', s.forgot)}>
						Har du glömt ditt lösenord? <Link href={'/konstnar/konto/aterstall-losenord'}>Återställ här.</Link>
					</span>
				</>
			}
		</div>
	);
}

Login.page = { title: 'Logga in', regional: false, crumbs: [{ slug: 'konstnar/konto', title: 'Konto' }] } as PageProps

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
	return {
		props,
		revalidate
	};
});

/*
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
*/