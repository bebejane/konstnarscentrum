import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import SignOut from "/components/account/SignOut";
import { MemberDocument, MemberByPasswordTokenDocument } from "/graphql";
import { apiQuery } from "dato-nextjs-utils/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RevealText, Loader, ErrorModal } from "/components";
import Reset from "/components/account/Reset";
export type Props = {
	member: MemberRecord,
	token: string
}

export default function AccountInvitation({ member, token }: Props) {

	const [error, setError] = useState<undefined | Error>();

	const handleSuccess = () => {
		console.log('success')
	}
	return (
		<div className={s.container}>
			<h1><RevealText>Konto</RevealText></h1>
			<h3>Välkommen, för att starta med ditt konto behöver du ange ett ny lösenord.</h3>
			<Reset token={member.resettoken} onSuccess={handleSuccess} />
			{error && <ErrorModal error={error} onClose={() => setError(undefined)} />}
		</div>
	);
}

AccountInvitation.page = { title: 'Konto', crumbs: [{ title: 'Konto', regional: false }] } as PageProps

export const getServerSideProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const token = context.query.token
	console.log(token)
	const { member } = await apiQuery(MemberByPasswordTokenDocument, { variables: { token } })

	if (!member)
		return { notFound: true }

	console.log(member)
	return {
		props: {
			...props,
			member
		}
	};
});
