import styles from "./index.module.scss";
import text from "./text.json"
import memberService from "/lib/services/member";
import { SubmitButton } from "./Auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { pingEndpoint } from "/lib/utils";

export default function SignUp({ regions = [], application, token }) {

	const [member, setMember] = useState();

	return (
		<div className={styles.container}>
			{!member ? (
				<SignupForm
					regions={regions.filter(el => !el.global)}
					setMember={setMember}
					application={application}
				/>
			) : (
				<div className={styles.success}>
					<h1>{text.thanksSigningUp}</h1>
					<p>
						<Link href={'/konstnar/konto/logga-in'}>
							<button>{text.signIn}</button>
						</Link>
					</p>
				</div>
			)}
		</div>
	);
}

const SignupForm = ({ regions, application, setMember }) => {

	const [error, setError] = useState();

	const { register, handleSubmit, reset, watch,
		formState: {
			errors,
			isSubmitting,
			isValid,
		}, formState
	} = useForm({
		defaultValues: {
			email: application.email,
			firstName: application.first_name,
			lastName: application.last_name,
			password: '',
			password2: '',
			regionId: application.region
		},
		mode: 'onChange'
	});

	useEffect(() => {
		isSubmitting && setError(undefined)
	}, [isSubmitting]);

	useEffect(() => {
		pingEndpoint('/api/auth/signup')
	}, [])

	const onSubmitSignup = async ({ email, password, password2, firstName, lastName, regionId }) => {
		try {
			const member = await memberService.signUp({ email, password, password2, firstName, lastName, regionId });
			setMember(member)
			reset({});
		} catch (err) {
			console.log(err);
			setError(err && err.response ? err.response.data : err.messsage || err);
		}
	};

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitSignup)} autoComplete="off">
				<input autoComplete="false" name="hidden" type="text" style={{ display: 'none' }} />
				<input
					placeholder={`${text.email}...`} {...register("email", {
						required: true,
						pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					})}
					className={errors.email ? styles.error : undefined}
					autoComplete="off"
					autoCorrect="off"
				/>
				<input
					placeholder={`${text.password}...`}  {...register("password", { required: true })}
					type="password"
					autoComplete="new-password"
					className={errors.password ? styles.error : undefined}
				/>
				<input
					placeholder={`${text.reTypePassword}...`} {...register("password2", {
						required: true,
						validate: (val: string) => watch('password') !== val ? "Lösenordet är ej samma värde" : true
					})}
					type="password"
					autoComplete="new-password"
					className={errors.password2 ? styles.error : undefined}
				/>
				<input
					autoComplete="off"
					placeholder={`${text.firstName}...`} {...register("firstName", { required: true })}
					className={errors.firstName ? styles.error : undefined}
				/>
				<input
					autoComplete="off"
					placeholder={`${text.lastName}...`} {...register("lastName", { required: true })}
					className={errors.lastName ? styles.error : undefined}
				/>
				<select
					autoComplete="off"
					placeholder={`${text.region}...`} {...register("regionId", {
						required: true,
						validate: (val) => val && val !== 'false'
					})}
					className={errors.regionId ? styles.error : undefined}
				>
					<option value="false" data-header={true}>Välj region</option>
					{regions.map((r, i) => <option key={i} value={r.id}>{r.name}</option>)}
				</select>
				<SubmitButton loading={isSubmitting} disabled={!isValid}>{text.send}</SubmitButton>
				{error && <p className={styles.formError}>{`${error.error || error.message || error}`}</p>}
			</form>
		</>
	);
};
