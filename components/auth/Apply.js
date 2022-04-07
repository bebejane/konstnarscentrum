import styles from "./Auth.module.scss";
import text from './text'
import memberService from "/services/member";
import Link from "next/link";
import { SubmitButton } from "./Auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Apply({ roles = [] }) {
	console.log(roles)
	const [application, setApplication] = useState();
	return (
		<div className={styles.container}>
			{!application ? (
				<ApplicationForm roles={roles} setApplication={setApplication} />
			) : (
				<div className={styles.success}>
					<h1>{text.thanksForRegistering}</h1>
					<p>{text.reviewYourRegistration}</p>
					<p>
						<Link href={"/"}>
							<a>{text.goHome}</a>
						</Link>
					</p>
				</div>
			)}
		</div>
	);
}

const ApplicationForm = ({ roles, setApplication }) => {
	const [error, setError] = useState();
	const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm();

	useEffect(() => isSubmitting && setError(false), [isSubmitting]);

	const onSubmitApplication = async ({ email, firstName, lastName, message, roleId }) => {
		try {
			const app = await memberService.apply({ email, firstName, lastName, message, roleId });
			setApplication(app);
		} catch (err) {
			setError(err && err.response ? err.response.data : err.messsage || err);
		}
	};
	return (
		<>
			<h2>{text.apply}</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitApplication)}>
				<input
					className={errors.email && styles.error}
					placeholder={`${text.email}...`}
					{...register("email", {
						required: true,
						pattern:
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					})}
				/>
				<input
					{...register("firstName", { required: true })}
					className={errors.firstName && styles.error}
					placeholder={`${text.firstName}...`}
					
				/>
				<input
					{...register("lastName", { required: true })}
					className={errors.lastName && styles.error}
					placeholder={`${text.lastName}...`}
					
				/>
				<textarea
					{...register("message", { required: true })}
					className={errors.message && styles.error}
					placeholder={`${text.message}...`}
					
				/>
				<select
					{...register("roleId", { required: true })}
					className={errors.roledId && styles.error}
					placeholder={`${text.district}...`}
				>
					{roles.map((r, i) => (
						<option key={i} value={r.id}>
							{r.name}
						</option>
					))}
				</select>
				<SubmitButton loading={isSubmitting}>{text.send}</SubmitButton>
				{error && 
					<p className={styles.formError}>{`${error.error || error.message || error}`}</p>
				}
			</form>
		</>
	);
};
