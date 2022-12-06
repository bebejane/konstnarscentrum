import styles from "./index.module.scss";
import text from './text.json'
import memberService from "/lib/services/member";
import Link from "next/link";
import { SubmitButton } from "./Auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Apply({ regions = [] }) {

	const [application, setApplication] = useState();
	return (
		<div className={styles.container}>
			{!application ? (
				<ApplicationForm regions={regions} setApplication={setApplication} />
			) : (
				<div className={styles.success}>
					<h1>{text.thanksForRegistering}</h1>
					<p>{text.reviewYourRegistration}</p>
					<p>
						<Link href={"/"}>
							{text.goHome}
						</Link>
					</p>
				</div>
			)}
		</div>
	);
}

const ApplicationForm = ({ regions, setApplication }) => {
	const [error, setError] = useState<undefined | Error>();
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

	useEffect(() => {
		isSubmitting && setError(undefined)
	}, [isSubmitting]);

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
					rows={10}
					className={errors.message && styles.error}
					placeholder={`${text.message}...`}
				/>
				<select
					{...register("roleId", {
						required: true,
						validate: (value: string) => regions.find(({ id }) => value === id) !== undefined
					})}
					className={errors.roledId && styles.error}
					placeholder={`${text.region}...`}
				>
					<option value="false">Välj region</option>
					{regions.map((r, i) => (
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
