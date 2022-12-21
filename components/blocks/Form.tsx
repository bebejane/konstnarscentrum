import s from './Form.module.scss'
import React, { useState } from 'react'
import Loader from '/components/common/Loader'

export type ButtonBlockProps = { data: FormRecord, onClick: Function }

export default function Form({ data: { id, formFields, reciever, subject }, onClick }: ButtonBlockProps) {

	const [formValues, setFormValues] = useState({ fromName: '', fromEmail: '' })
	const [error, setError] = useState<Error | undefined>()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState<boolean | undefined>()

	const handleInputChange = ({ target: { id, value } }) => {
		setFormValues({ ...formValues, [id]: value })
	}

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()

		setLoading(false)
		setSuccess(undefined)
		setError(undefined)

		const fromName = formValues.fromName;
		const fromEmail = formValues.fromEmail;
		const to = reciever;
		const fields = formFields.map(({ title, id }) => ({ title, value: formValues[id] }))
		const form = { subject, fromEmail, fromName, to, fields }

		setLoading(true)

		fetch('/api/contact-form', {
			body: JSON.stringify(form),
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		}).then(async (res) => {
			const { success, error } = await res.json()
			console.log(success, error);

			if (success === true)
				setSuccess(true)
			else if (error)
				setError(new Error(error))

		}).catch((err) => setError(err)).finally(() => setLoading(false))
	}

	return (
		<section className={s.form}>
			<form onSubmit={handleSubmit}>
				<label htmlFor={'fromName'}>Namn</label>
				<input id={'fromName'} type="text" value={formValues.fromName} onChange={handleInputChange} />

				<label htmlFor={'from-email'}>Email</label>
				<input id={'fromEmail'} type="email" value={formValues.fromEmail} onChange={handleInputChange} />

				{formFields.map(({ id, __typename, title }) => {
					const props = { 'data-typename': __typename, value: formValues[id], onChange: handleInputChange }
					return (
						<>
							<label htmlFor={id}>{title}</label>
							{(() => {
								switch (__typename) {
									case 'FormTextRecord':
										return <input id={id} type="text"  {...props} />
									case 'FormTextblockRecord':
										return <textarea id={id} rows={6}  {...props} />
									case 'PdfFormRecord':
										return <input id={id} type="file"  {...props} />
									default:
										return <div>Unsupported: {__typename}</div>
								}
							})()}
						</>
					)
				})}
				<button type="submit">Skicka</button>
				<Loader loading={loading} />
				{error && <>Error: {error.message}</>}
			</form>
		</section>
	)
}