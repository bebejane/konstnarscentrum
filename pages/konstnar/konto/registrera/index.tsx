import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import SignUp from "/components/account/SignUp";
import { getCsrfToken, useSession } from "next-auth/react";
import { RevealText } from "/components";
import { useEffect, useState } from "react";
import { Loader } from "/components";
import { regions } from "/lib/region";
import applicationController from '/lib/controllers/application'
import Link from "next/link";

export type Props = {
	csrfToken: string,
	token: string
	application: ApplicationRecord
}

export default function Register({ token, application }: Props) {

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
				!application ?
					<div className={s.error}>Ogiltig ansöknings adress</div>
					:
					<>
						<h1><RevealText>Registrera dig</RevealText></h1>
						<p className="intro">
							Fyll i ditt lösenord för att skapa ditt konto.
						</p>
						<SignUp
							token={token}
							application={application}
							regions={regions.filter(({ global }) => !global)}
						/>
					</>
			}
		</div>
	);
}

Register.page = { title: 'Registrera dig', crumbs: [{ slug: 'konstnar/konto', title: 'Konto', regional: false }] } as PageProps

export const getServerSideProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const { token } = context.query
	const application = token ? await applicationController.getByToken(token) : undefined

	return {
		props: {
			...props,
			application: application ?? null,
			token: token ?? null,
		}

	};
});