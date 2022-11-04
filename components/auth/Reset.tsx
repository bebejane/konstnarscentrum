import styles from "./Auth.module.scss";
import text from "./text.json";
import { SubmitButton } from "./Auth";
import memberService from "/lib/services/member";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Reset({ token }) {
	const [status, setStatus] = useState(false);
	return (
		<div className={styles.container}>
			{!status && !token ? (
				<ResetForm setStatus={setStatus} />
			) : !status && token ? (
				<UpdatePasswordForm setStatus={setStatus} token={token} />
			) : (
				<div className={styles.success}>
					<h1>{text.requestPasswordReset}</h1>
					<p>
						{status === "requestSent" && text.passwordEmailSent}
						{status === "resetPassword" && text.yourPasswordHasBeenUpdated}
					</p>
				</div>
			)}
		</div>
	);
}

const ResetForm = ({ setStatus }) => {
	const [error, setError] = useState();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm();

	useEffect(() => isSubmitting && setError(false), [isSubmitting]);

	const onSubmitReset = async ({ email }) => {
		try {
			const res = await memberService.reset({ email });
			setStatus("requestSent");
		} catch (err) {
			setError(err && err.response ? err.response.data : err.messsage || err);
		}
	};
	return (
		<>
			<h2>{text.requestPasswordReset}</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitReset)}>
				<input
					className={errors.email && styles.error}
					placeholder="E-mail"
					{...register("email", {
						required: true,
						pattern:
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					})}
				/>
				<SubmitButton loading={isSubmitting}>{text.send}</SubmitButton>
				{error && <p className={styles.formError}>{`${error.error || error.message || error}`}</p>}
			</form>
		</>
	);
};

const UpdatePasswordForm = ({ setStatus, token }) => {
	const [error, setError] = useState();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm();

	useEffect(() => isSubmitting && setError(false), [isSubmitting]);

	const onSubmitUpdate = async ({ password, password2 }) => {
		try {
			const res = await memberService.reset({ token, password, password2 });
			setStatus("resetPassword");
		} catch (err) {
			setError(err && err.response ? err.response.data : err.messsage || err);
		}
	};
	return (
		<>
			<h2>{text.updatePassword}</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitUpdate)}>
				<input
					type="password"
					placeholder="Password..."
					{...register("password", { required: true })}
					className={errors.passsord && styles.error}
				/>
				<input
					type="password"
					placeholder="Re-type..."
					{...register("password2", { required: true })}
					className={errors.password2 && styles.error}
				/>
				<SubmitButton loading={isSubmitting}>{text.send}</SubmitButton>
				<p className={styles.formError}>
					{error && `Error: ${error.error || error}`}
				</p>
				<p className={styles.formLinks}>
					<Link href={"/auth/signin"}>
						{text.signIn}
					</Link>
				</p>
			</form>
		</>
	);
};
