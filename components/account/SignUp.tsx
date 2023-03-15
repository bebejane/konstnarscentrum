import styles from "./index.module.scss";
import text from "./text.json"
import memberService from "/lib/services/member";
import { SubmitButton } from "./Auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { pingEndpoint } from "/lib/utils";
import { validatePassword } from "/lib/auth/validate";

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
					<p>{text.thanksSigningUp}</p>
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
	const [showPass, setShowPass] = useState(false)
	const [showPass2, setShowPass2] = useState(false)

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
			console.error(err);
			setError(err && err.response ? err.response.data : err.messsage || err);
		}
	};

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitSignup)} autoComplete="off">
				<input autoComplete="false" name="hidden" type="text" style={{ display: 'none' }} />
				<input
					autoComplete="off"
					type="hidden"
					placeholder={`${text.firstName}...`} {...register("firstName", { required: true })}
					className={errors.firstName ? styles.error : undefined}
				/>
				<input
					autoComplete="off"
					type="hidden"
					placeholder={`${text.lastName}...`} {...register("lastName", { required: true })}
					className={errors.lastName ? styles.error : undefined}
				/>
				<input
					placeholder={`${text.email}...`} {...register("email", {
						required: true,
						pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					})}
					disabled={true}
					className={errors.email ? styles.error : undefined}
					autoComplete="off"
					autoCorrect="off"
				/>

				<div className={styles.password}>
					<input
						placeholder={`${text.password}...`}  {...register("password", {
							required: true,
							validate: (val: string) => validatePassword(val) ?? true
						})}
						type={showPass ? 'text' : 'password'}
						autoComplete="new-password"
						className={errors.password ? styles.error : undefined}
					/>
					<button className={styles.toggle} type="button" onClick={() => setShowPass(!showPass)}>
						<img src={`/images/password-${showPass ? 'show' : 'hide'}.png`} />
					</button>
				</div>
				<div className={styles.password}>
					<input
						placeholder={`${text.reTypePassword}...`} {...register("password2", {
							required: true,
							validate: (val: string) => validatePassword(val) ?? watch('password') !== val ? "Lösenorden överestämmer ej" : true
						})}
						type={showPass2 ? 'text' : 'password'}
						autoComplete="new-password"
						className={errors.password2 ? styles.error : undefined}
					/>
					<button className={styles.toggle} type="button" onClick={() => setShowPass2(!showPass2)}>
						<img src={`/images/password-${showPass2 ? 'show' : 'hide'}.png`} />
					</button>
				</div>
				<label>Lösenordet måste minst innehålla 8 tecken, en versal, en gemen och en siffra</label>
				<input
					autoComplete="off"
					type="hidden"
					disabled={true}
					placeholder={`${text.region}...`} {...register("regionId", {
						required: true,
						validate: (val) => val && val !== 'false'
					})}
					className={errors.regionId ? styles.error : undefined}
				/>
				<SubmitButton loading={isSubmitting} disabled={!isValid}>{text.send}</SubmitButton>
				{error && <p className={styles.formError}>{`${error.error || error.message || error}`}</p>}
			</form>
		</>
	);
};
