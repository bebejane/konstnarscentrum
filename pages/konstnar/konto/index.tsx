import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import SignOut from "/components/auth/SignOut";
import { ClientSafeProvider, getCsrfToken, getSession } from "next-auth/react";
import { MemberDocument, AllMemberCategoriesDocument } from "/graphql";
import { apiQuery } from "dato-nextjs-utils/api";
import { useState } from "react";
import { recordToSlug } from "/lib/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";

export type Props = {
	csrfToken: string,
	providers: ClientSafeProvider[],
	member: MemberRecord,
	memberCategories: MemberCategoryRecord[]
}

export default function Account({ csrfToken, providers, member: memberFromProps, memberCategories }: Props) {

	const [error, setError] = useState<undefined | Error>();
	const [saving, setSaving] = useState(false);
	const [member, setMember] = useState<MemberRecord>(memberFromProps)
	const { firstName, lastName, bio, birthPlace, city, yearOfBirth, webpage, instagram, memberCategory } = member

	const { register, handleSubmit, getValues, formState: { errors, isSubmitting }, formState } = useForm({
		defaultValues: {
			firstName,
			lastName,
			bio,
			birthPlace,
			city,
			yearOfBirth,
			webpage,
			instagram,
			memberCategory: memberCategory.map(c => c.id)
		}
	})
	const [formValues, setFormValues] = useState<any>({ ...member })

	const onSubmit = async (form) => {
		setSaving(true)

		fetch('/api/account', {
			body: JSON.stringify({ ...form }),
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(async (res) => setMember((await res.json()).member))
			.catch((err) => setError(err))
			.finally(() => setSaving(false))
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="firstName">Förnamn</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
					{...register("firstName", { required: true })}
				/>
				<label htmlFor="lastName">Efternamn</label>
				<input
					id="lastName"
					name="lastName"
					type="text"
					{...register("lastName", { required: true })}
				/>
				<label htmlFor="bio">Bio</label>
				<textarea
					id="bio"
					name="bio"
					rows={6}
					{...register("bio", { required: true, minLength: 10 })}
				/>
				<label htmlFor="birthPlace">Födelsestad</label>
				<input
					id="birthPlace"
					name="birthPlace"
					type="text"
					{...register("birthPlace", { required: true })}
				/>
				<label htmlFor="city">Arbetar i</label>
				<input
					id="city"
					name="city"
					type="text"
					{...register("city", { required: true })}
				/>
				<label htmlFor="yearOfBirth">Födelseår</label>
				<input
					id="yearOfBirth"
					name="yearOfBirth"
					type="text"
					{...register("yearOfBirth", { required: true })}
				/>
				<label htmlFor="webpage">Hemsida</label>
				<input
					id="webpage"
					name="webpage"
					type="text"
					{...register("webpage", { required: false })}
				/>
				<label htmlFor="instagram">Instagram</label>
				<input
					id="instagram"
					name="instagram"
					type="text"
					{...register("instagram", { required: false })}
				/>
				<label htmlFor="instagram">Typer av konst</label>
				<div className={styles.checkboxGroup}>
					{memberCategories?.map(({ id, categoryType }, idx) =>
						<div key={idx}>
							<input
								type="checkbox"
								value={id}
								name="memberCategory"
								{...register("memberCategory", { required: false })}
							/>
							<label>
								{categoryType}
							</label>
						</div>
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
