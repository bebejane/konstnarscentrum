import s from './Form.module.scss'
import React, { useState } from 'react'

export type ButtonBlockProps = { data: FormRecord, onClick: Function }

export default function Form({ data: { id, formFields, reciever, subject }, onClick }: ButtonBlockProps) {

	const [formValues, setFormValues] = useState({ formName: '', formEmail: '' })
	const handleInputChange = ({ target: { id, value } }) => {
		setFormValues({ ...formValues, [id]: value })
	}

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
	}

	return (
		<section className={s.form}>
			<form onSubmit={handleSubmit}>

				<label htmlFor={'form-name'}>Namn</label>
				<input id={'form-name'} type="text" value={formValues.formName} onChange={handleInputChange} />

				<label htmlFor={'form-email'}>Email</label>
				<input id={'form-email'} type="email" value={formValues.formEmail} onChange={handleInputChange} />

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
			</form>
		</section>
	)
}