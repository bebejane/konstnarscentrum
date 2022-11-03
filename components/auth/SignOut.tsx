import styles from "./Auth.module.scss";
import text from "./text.json"
import { SubmitButton } from "./Auth";
import {signOut} from 'next-auth/react'
import { useState } from "react";

export default function SignOut({}) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const handleSubmit = () => {
		setIsSubmitting(true);
		signOut({callbackUrl: `${window.location.origin}`})
	}
	return (
		<div className={styles.container}>
			<SubmitButton loading={isSubmitting} onClick={handleSubmit}>{text.signOut}</SubmitButton>
		</div>
	);
}