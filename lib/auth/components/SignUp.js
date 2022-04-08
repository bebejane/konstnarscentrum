import styles from "./Auth.module.scss";
import text from "./text"
import memberService from "/services/member";
import { SubmitButton } from "./Auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link'

export default function SignUp({districts = [], application, token }) {
	
	const [member, setMember] = useState();
	return (
		<div className={styles.container}>
			{!member ? (
				<SignupForm districts={districts} setMember={setMember} application={application}/>
			) : (
				<div className={styles.success}>
          <h1>{text.thanksSigningUp}</h1>
          <p>
						<Link href={'/auth/signin'}>
            	<button>{text.signIn}</button>
						</Link>
          </p>
        </div>
			)}
		</div>
	);
}

const SignupForm = ({ districts, application, setMember }) => {
	const [error, setError] = useState();
	const { register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm();

	useEffect(() => isSubmitting && setError(false), [isSubmitting]);

	const onSubmitSignup = async ({ email, password, password2, firstName, lastName, roleId }) => {
		try {
			const member = await memberService.signUp({ email, password, password2, firstName, lastName, roleId });
			setMember(member)
			reset({});
		} catch (err) {
			setError(err && err.response ?  err.response.data : err.messsage || err);
		}
	};

	return (
		<>
			<h2>Sign up</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitSignup)}>
				<input placeholder={`${text.email}...`} {...register("email", { required: true, pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  })} className={errors.email && styles.error} />	
				<input placeholder={`${text.password}...`}  {...register("password", { required: true })} type="password" className={errors.password && styles.error} />
				<input placeholder={`${text.reTypePassword}...`} {...register("password2", { required: true })} type="password" className={errors.password2 && styles.error} />
				<input placeholder={`${text.firstName}...`} {...register("firstName", { required: true })} className={errors.firstName && styles.error} />
				<input placeholder={`${text.lastName}...`} {...register("lastName", { required: true })} className={errors.lastName && styles.error} />
				<select placeholder={`${text.district}...`} {...register("roleId", { required: true })} className={errors.roleId && styles.error}>
					{districts.map((r, i) => <option key={i} value={r.id}>{r.name}</option>)}
				</select>
				<SubmitButton loading={isSubmitting}>{text.send}</SubmitButton>
				{error && <p className={styles.formError}>{`${error.error || error.message || error}`}</p>}
			</form>
		</>
	);
};
