import s from './Form.module.scss'
import cn from 'classnames'
import { buildClient } from '@datocms/cma-client-browser';
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { OnProgressInfo } from '@datocms/cma-client-browser';
import { Loader } from '/components';

const client = buildClient({ apiToken: process.env.NEXT_PUBLIC_UPLOADS_API_TOKEN });

export type ButtonBlockProps = {
	recordId: string,
	data: FormRecord,
	onClick: Function
}

export default function Form({ recordId, data: { id, formFields, subject, confirmation }, onClick }: ButtonBlockProps) {

	const [formValues, setFormValues] = useState({ fromName: '', fromEmail: '' })
	const [error, setError] = useState<Error | undefined>()
	const [loading, setLoading] = useState(false)
	const [upload, setUpload] = useState<Upload | undefined>()
	const [success, setSuccess] = useState<boolean | undefined>()
	const confirmationRef = useRef<HTMLParagraphElement | undefined>()

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
		const fields = formFields.map(({ title, id }) => ({ title, value: formValues[id] }))
		const form = { recordId, fromEmail, fromName, fields }

		setLoading(true)
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

	useEffect(() => {
		if (!success)
			confirmationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
	}, [success])

	return (
		<section className={s.form}>
			{success ?
				<p ref={confirmationRef} className={s.confirmation}>{confirmation}</p>
				:
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
											return (
												<FileInput
													{...props}
													label="Välj fil..."
													onError={(err) => setError(err)}
													onChange={(upload) => setFormValues({ ...formValues, [fieldId]: upload?.url })}
												/>
											)
										default:
											return <div key={idx}>Unsupported: {__typename}</div>
									}
								})()}
							</React.Fragment>
						)
					})}

					{error &&
						<p className={s.error}>
							{error.message}
						</p>
					}

					<button type="submit" disabled={loading}>
						{loading ? <Loader /> : 'Skicka'}
					</button>

				</form>
			}
		</section>
	)
}


const FileInput = ({ label, formId, onChange, onError }) => {

	const [uploading, setUploading] = useState(false)
	const [error, setError] = useState<Error | undefined>()
	const [upload, setUpload] = useState<Upload | undefined>()
	const [progress, setProgress] = useState<number | undefined>()
	const ref = useRef<HTMLInputElement | null>(null)

	const resetInput = () => {
		setUpload(undefined)
		setUploading(false)
		setProgress(undefined)
		setError(undefined)
		ref.current.value = ''
	}

	const createUpload = useCallback((file: File) => {
		if (!file) return

		resetInput()
		setUploading(true)

		return client.uploads.createFromFileOrBlob({
			fileOrBlob: file,
			filename: file.name,
			tags: ['form-upload', `${formId}`],
			default_field_metadata: {
				en: {
					alt: `Form upload: ${formId}`,
					title: `Form upload: ${formId}`,
					custom_data: { formId }
				}
			},
			onProgress: (info: OnProgressInfo) => {
				if (info.payload && 'progress' in info.payload) {
					setProgress(info.payload.progress)
					if (info.payload.progress >= 100) {
						setUploading(false)
					}
				}
			},
		})
	}, [formId])

	const handleChange = useCallback((event) => {
		const file = event.target.files[0];
		createUpload(file).then((upload) => setUpload(upload)).catch(setError)
	}, [createUpload])

	useEffect(() => {
		if (ref.current === null) return

		ref.current?.removeEventListener('change', handleChange);
		ref.current.addEventListener('change', handleChange);

	}, [ref, createUpload, handleChange])

	useEffect(() => {
		onChange(upload)
	}, [upload])

	useEffect(() => {
		onError(error)
	}, [error])

	return (
		<p>
			{!upload ?
				<button type="button" onClick={() => ref.current?.click()} disabled={progress !== undefined || uploading}>
					{progress !== undefined ? `${progress}%` : label}
				</button>
				:
				<div className={s.filename}>
					<span>{upload.filename}</span>
					<span onClick={resetInput}>Ta bort</span>
				</div>
			}
			<input type="file" ref={ref} accept={'.pdf'} />
		</p>
	)
}