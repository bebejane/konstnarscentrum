import styles from "./index.module.scss";
import { authOptions } from '/pages/api/auth/[...nextauth]'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import SignOut from "/components/auth/SignOut";
import { requireAuthentication } from "/lib/auth";
import { ClientSafeProvider, getCsrfToken, useSession, getSession } from "next-auth/react";
import { MemberDocument, AllMemberCategoriesDocument } from "/graphql";
import { apiQuery } from "dato-nextjs-utils/api";
import { useState } from "react";
import { recordToSlug } from "/lib/utils";
import Link from "next/link";

export type Props = {
	csrfToken: string,
	providers: ClientSafeProvider[],
	member: MemberRecord,
	memberCategories: MemberCategoryRecord[]
}

export default function LogOut({ csrfToken, providers, member, memberCategories }: Props) {

	const [formValues, setFormValues] = useState<any>({ ...member })
	const handleFormField = ({ target: { id, value } }) => {
		setFormValues({ ...formValues, [id]: value })
	}

	return (
		<div className={styles.container}>
			<h1>Konto</h1>
			<p>
				<Link href={recordToSlug(member)}>
					Gå till din portfolio
				</Link>
			</p>
			<h3>Uppdatera uppgifter</h3>
			<form>
				<label htmlFor="firstName">Förnamn</label>
				<input id="firstName" name="firstName" type="text" value={formValues.firstName} onChange={handleFormField} />
				<label htmlFor="lastName">Efternamn</label>
				<input id="lastName" name="lastName" type="text" value={formValues.lastName} onChange={handleFormField} />
				<label htmlFor="bio">Bio</label>
				<textarea id="bio" name="bio" value={formValues.bio} rows={6} onChange={handleFormField} />
				<label htmlFor="birhtPlace">Födelsestad</label>
				<input id="birhtPlace" name="birhtPlace" type="text" value={formValues.birhtPlace} onChange={handleFormField} />
				<label htmlFor="city">Födelsestad</label>
				<input id="city" name="city" type="text" value={formValues.city} onChange={handleFormField} />
				<label htmlFor="yearOfBirth">Födelseår</label>
				<input id="yearOfBirth" name="yearOfBirth" type="text" value={formValues.yearOfBirth} onChange={handleFormField} />
				<label htmlFor="webpage">Hemsida</label>
				<input id="webpage" name="webpage" type="text" value={formValues.webpage} onChange={handleFormField} />
				<label htmlFor="instagram">Instagram</label>
				<input id="instagram" name="instagram" type="text" value={formValues.instagram} onChange={handleFormField} />
				<label htmlFor="instagram">Typer av konst</label>
				<div className={styles.checkboxGroup}>
					{memberCategories?.map(({ id, categoryType }, idx) =>
						<div key={idx}><input type="checkbox" value={id} />{categoryType}</div>
					)}
				</div>
				<button>Spara</button>
			</form >
			<h3>Övrigt</h3>
			<SignOut />
		</div >
	);
}

export const getServerSideProps: GetStaticProps = withGlobalProps({ queries: [AllMemberCategoriesDocument] }, async ({ props, revalidate, context }: any) => {
	const res = await getCsrfToken(context)
	const csrfToken = res
	const session = await getSession(context);
	const { member } = await apiQuery(MemberDocument, { variables: { email: session.user.email } })

	if (!member)
		return { notFound: true }

	return {
		props: {
			...props,
			csrfToken,
			member
		}
	};
});
