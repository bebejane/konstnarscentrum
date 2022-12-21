import s from './Form.module.scss'
import React, { useState } from 'react'

export type ButtonBlockProps = { data: FormRecord, onClick: Function }

export default function Form({ data: { id, formFields, reciever, subject }, onClick }: ButtonBlockProps) {

	const [formValues, setFormValues] = useState({})
	const handleInputChange = ({ target: { id, value } }) => {
		setFormValues({ ...formValues, [id]: value })
	}
	return (
		<section>
			<form>
				{formFields.map(({ id, __typename, title }) =>
					(() => {
						switch (__typename) {
							case 'FormTextRecord':
								return <input id={id} type="text" data-typename={__typename} value={formValues[id]} onChange={handleInputChange} />
							case 'FormTextblockRecord':
								return <textarea id={id} data-typename={__typename} rows={6} value={formValues[id]} onChange={handleInputChange} />
							case 'FormEmailRecord':
								return <input id={id} type="email" data-typename={__typename} value={formValues[id]} onChange={handleInputChange} />
							default:
								return <div>Unsupported: {__typename}</div>

						}
					})()
				)}
			</form>
		</section>
	)
}