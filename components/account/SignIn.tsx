import styles from "./index.module.scss";
import text from "./text.json";
import { SubmitButton } from "./Auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { pingEndpoint } from "/lib/utils";
import { log } from "console";

export default function SignIn({ csrfToken, providers }) {

	const router = useRouter();
	const [showPass, setShowPass] = useState(false)
	const [error, setError] = useState<undefined | string | Error>();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmitSignIn = async ({ username, password }) => {

		setError(null)

		await signIn("credentials", {
			callbackUrl: `${window.location.origin}/konstnar/konto`,
			redirect: true,
			username,
			password,
		});
		/*
		if (res.status === 401)
			setError("Användarnamn eller lösenord är felaktigt")
		else
			setError(res.error)
		*/
	};

	useEffect(() => {
		pingEndpoint(['/api/account?ping=1', '/konstnar/konto/aterstall-losenord'], 'POST')
		pingEndpoint('/api/auth/session', 'GET')

	}, [])

	useEffect(() => {
		router.query.error && setError("Användarnamn eller lösenord är felaktigt")
	}, [router]);

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				method="post"
				action="/api/auth/callback/credentials"
				onSubmit={handleSubmit(onSubmitSignIn)}
			>
				<input name="csrfToken" type="hidden" value={csrfToken} />
				<input
					{...register("username", { required: true })}
					placeholder={`${text.email}...`}
					name="username"
					type="text"
					className={errors.password && styles.error}
				/>
				<div className={styles.password}>
					<input
						{...register("password", { required: true })}
						placeholder={`${text.password}...`}
						name="password"
						type={showPass ? 'text' : 'password'}
						className={errors.password && styles.error}
					/>
					<button className={styles.toggle} type="button" onClick={() => setShowPass(!showPass)}>
						<img src={`/images/password-${showPass ? 'show' : 'hide'}.png`} />
					</button>
				</div>
				<SubmitButton loading={isSubmitting}>
					{text.signIn}
				</SubmitButton>
				{error &&
					<p className={styles.formError}>
						{`${typeof error === 'string' ? error : error.message}`}
					</p>
				}
			</form>
		</div>
	);
}
