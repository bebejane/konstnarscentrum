import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import SignOut from "/components/auth/SignOut";
import { ClientSafeProvider, getCsrfToken, getSession } from "next-auth/react";
import { MemberDocument, AllMemberCategoriesDocument } from "/graphql";
import { apiQuery } from "dato-nextjs-utils/api";
import { useEffect, useState } from "react";
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
	const { id, firstName, lastName, bio, birthPlace, city, yearOfBirth, webpage, instagram, memberCategory } = member

	const { register, handleSubmit, formState: { errors, isSubmitting }, formState } = useForm({
		defaultValues: {
			id,
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

	useEffect(() => {
		Object.keys(errors).forEach(k => {

		})

	}, [formState, errors])

	console.log(errors);

	return (
		<div className={s.container}>
			<h1>Konto</h1>
			<p>
				<Link href={recordToSlug(member)}>
					Gå till din portfolio
				</Link>
			</p>
			<h3>Uppdatera uppgifter</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					id="id"
					name="id"
					type="hidden"
					{...register("id", { required: true })}
				/>
				<label htmlFor="firstName">Förnamn</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
					{...register("firstName", { required: 'Förnamn saknas' })}
				/>
				<ErrorMessage id="firstName" errors={errors} />
				<label htmlFor="lastName">Efternamn</label>
				<input
					id="lastName"
					name="lastName"
					type="text"
					{...register("lastName", { required: 'Efternamn saknas' })}
				/>
				<ErrorMessage id="lastName" errors={errors} />
				<label htmlFor="bio">Bio</label>
				<textarea
					id="bio"
					name="bio"
					rows={6}
					{...register("bio", {
						required: true,
						minLength: { value: 200, message: 'Din biografi måste vara 200 tecken eller längre' }
					})}
				/>
				<ErrorMessage id="bio" errors={errors} />
				<label htmlFor="birthPlace">Födelsestad</label>
				<input
					id="birthPlace"
					name="birthPlace"
					type="text"
					{...register("birthPlace", { required: 'Födelsort är obligatoriskt' })}
				/>
				<ErrorMessage id="birthPlace" errors={errors} />
				<label htmlFor="city">Arbetar i</label>
				<input
					id="city"
					name="city"
					type="text"
					{...register("city", { required: false })}
				/>
				<ErrorMessage id="city" errors={errors} />
				<label htmlFor="yearOfBirth">Födelseår</label>
				<input
					id="yearOfBirth"
					name="yearOfBirth"
					type="text"
					{...register("yearOfBirth", { required: false })}
				/>
				<ErrorMessage id="yearOfBirth" errors={errors} />
				<label htmlFor="webpage">Hemsida</label>
				<input
					id="webpage"
					name="webpage"
					type="text"
					{...register("webpage", {
						required: false,
						pattern: {
							value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
							message: 'Värde måste vara en URL'
						}
					})}
				/>
				<ErrorMessage id="webpage" errors={errors} />
				<label htmlFor="instagram">Instagram</label>
				<input
					id="instagram"
					name="instagram"
					type="text"
					{...register("instagram", {
						required: false,
						pattern: {
							value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
							message: 'Värde måste vara en URL'
						}
					})}
				/>
				<ErrorMessage id="instagram" errors={errors} />
				<label htmlFor="instagram">Typer av konst</label>
				<div className={s.checkboxGroup}>
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
				<ErrorMessage id="memberCategory" errors={errors} />
				<button disabled={saving}>Spara</button>
			</form >
			<h3>Övrigt</h3>
			<SignOut />
		</div >
	);
}

const ErrorMessage = ({ errors, id }) => {
	if (!errors[id])
		return null

	return (
		<div className={s.error}>{errors[id].message}</div>
	)
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
