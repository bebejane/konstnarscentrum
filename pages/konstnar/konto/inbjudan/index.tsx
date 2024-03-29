import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { MemberByPasswordTokenDocument } from "/graphql";
import { apiQuery } from "dato-nextjs-utils/api";
import { useState } from "react";
import { RevealText, ErrorModal } from "/components";
import Reset from "/components/account/Reset";

export type Props = {
	member: MemberRecord,
	token: string
}

export default function AccountInvitation({ member }: Props) {

	const [error, setError] = useState<undefined | Error>();

	const handleSuccess = () => {
		console.log('success')
	}

	return (
		<div className={s.container}>
			<h1><RevealText>Konto</RevealText></h1>
			{member ?
				<>
					<h3>Välkommen, för att starta med ditt konto behöver du ange ett ny lösenord.</h3>
					<Reset token={member.resettoken} onSuccess={handleSuccess} />
					{error && <ErrorModal error={error} onClose={() => setError(undefined)} />}
				</>
				:
				<>Inbjudnings länk ogiltig</>
			}

		</div>
	);
}

AccountInvitation.page = { title: 'Konto', crumbs: [{ title: 'Konto', regional: false }] } as PageProps

export const getServerSideProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

	const token = context.query.token

	if (!token) return { props }

	const { member } = await apiQuery(MemberByPasswordTokenDocument, { variables: { token } })

	return {
		props: {
			...props,
			member: member ?? null
		}
	};
});
