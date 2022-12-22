import s from './Form.module.scss'
import cn from 'classnames'
import { buildClient } from '@datocms/cma-client-browser';
import React, { ForwardedRef, useEffect, useRef, useState } from 'react'
import { OnProgressInfo } from '@datocms/cma-client-browser';
import { Upload } from '@datocms/cma-client/dist/types/generated/SimpleSchemaTypes';

export type ButtonBlockProps = { data: FormRecord, onClick: Function }

const client = buildClient({ apiToken: process.env.NEXT_PUBLIC_UPLOADS_API_TOKEN });

export default function Form({ data: { id, formFields, reciever, subject }, onClick }: ButtonBlockProps) {

	const [formValues, setFormValues] = useState({ fromName: '', fromEmail: '' })
	const [error, setError] = useState<Error | undefined>()
	const [loading, setLoading] = useState(false)
	const [upload, setUpload] = useState<Upload | undefined>()
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

		setTimeout(() => {
			setLoading(false)
			setSuccess(true)
		}, 2000)


		fetch('/api/contact-form', {
			body: JSON.stringify(form),
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		}).then(async (res) => {
			const { success, error } = await res.json()

			if (success === true)
				setSuccess(true)
			else if (error)
				setError(new Error(error))

		}).catch((err) => setError(err)).finally(() => setLoading(false))
	}

	return (
		<section className={s.form}>
			<form onSubmit={handleSubmit} className={cn(loading && s.loading)}>
				<label htmlFor={'fromName'}>Namn</label>
				<input id={'fromName'} type="text" value={formValues.fromName} onChange={handleInputChange} />

				<label htmlFor={'from-email'}>Email</label>
				<input id={'fromEmail'} type="email" value={formValues.fromEmail} onChange={handleInputChange} />

				{formFields.map(({ id: fieldId, __typename, title }, idx) => {
					const props = { id: fieldId, formId: id, 'data-typename': __typename, value: formValues[id], onChange: handleInputChange }
					return (
						<React.Fragment key={idx}>
							<label htmlFor={id}>{title}</label>
							{(() => {
								switch (__typename) {
									case 'FormTextRecord':
										return <input type="text"  {...props} />
									case 'FormTextblockRecord':
										return <textarea rows={6}  {...props} />
									case 'PdfFormRecord':
										return <FileInput label="Välj fil..." {...props} onChange={(u: Upload) => setFormValues({ ...formValues, [id]: upload?.url })} />
									default:
										return <div key={idx}>Unsupported: {__typename}</div>
								}
							})()}
						</React.Fragment>
					)
				})}

				{error &&
					<p className={s.error}>Error: {error.message}</p>
				}

				<button type="submit" disabled={loading}>
					{loading ? 'Skickar...' : 'Skicka'}
				</button>

			</form>
		</section>
	)
}


const FileInput = ({ label, formId, onChange }) => {

	const [uploading, setUploading] = useState(false)
	const [upload, setUpload] = useState<Upload | undefined>()
	const [progress, setProgress] = useState<number | undefined>()
	const ref = useRef<HTMLInputElement | null>(null)

	const onClick = (e) => {
		ref.current?.click();
	}
	const resetInput = () => {
		setUpload(undefined)
		setUploading(false)
		setProgress(undefined)
	}

	const createUpload = (file: File) => {

		setUploading(true)

		return client.uploads.createFromFileOrBlob({
			fileOrBlob: file,
			filename: file.name,
			default_field_metadata: {
				en: {
					alt: `Form upload: ${formId}`,
					title: `Form upload: ${formId}`,
					custom_data: {
						formId
					}
				}
			},
			onProgress: (info: OnProgressInfo) => {
				console.log('Phase:', info.type);
				console.log('Details:', info.payload);
				if (info.payload && 'progress' in info.payload) {
					setProgress(info.payload.progress)
					if (info.payload.progress >= 100) {
						setUploading(false)
					}
				}
			},
		});
	}

	useEffect(() => {
		if (ref.current === null) return

		const handleChange = (event) => {
			const file = event.target.files[0];
			createUpload(file).then((upload) => setUpload(upload));
		}

		ref.current.addEventListener('change', handleChange);

		return () => ref.current.removeEventListener('change', handleChange);
	}, [ref])

	useEffect(() => {
		onChange(upload)
	}, [upload, onChange])

	return (
		<p>
			<input type="file" ref={ref} />
			{!upload ?
				<button type="button" onClick={onClick} disabled={progress !== undefined}>
					{progress !== undefined ? `${progress}%` : label}
				</button>
				:
				<p className={s.filename}>
					<span>{upload.filename}</span>
					<span onClick={resetInput}>Ta bort</span>
				</p>
			}
		</p>
	)
}