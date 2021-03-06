import styles from "./Auth.module.scss";
import text from "./text";
import { SubmitButton } from "./Auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export default function SignIn({ csrfToken, domain }) {
	const router = useRouter();
	const [error, setError] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmitSignIn = async ({ username, password }) => {
		
		await signIn("credentials", {
			callbackUrl: `${window.location.origin}/member`,
			username,
			password,
		});
	};

	useEffect(() => router.query.error && setError("Username or password incorrect"), [router]);

	return (
		<div className={styles.container}>
			<h2>{text.signIn}</h2>
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
				<input
					{...register("password", { required: true })}
					placeholder={`${text.password}...`}
					name="password"
					type="password"
					className={errors.password && styles.error}
				/>
				<SubmitButton loading={isSubmitting}>{text.send}</SubmitButton>
				{error && <p className={styles.formError}>{`${error.error || error.message || error}`}</p>}
			</form>
		</div>
	);
}
