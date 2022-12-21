import s from './Form.module.scss'
import { buildClient } from '@datocms/cma-client-browser';
import React, { useEffect, useRef, useState } from 'react'
import Loader from '/components/common/Loader'

export type ButtonBlockProps = { data: FormRecord, onClick: Function }

const client = buildClient({ apiToken: process.env.NEXT_PUBLIC_UPLOADS_API_TOKEN });


export default function Form({ data: { id, formFields, reciever, subject }, onClick }: ButtonBlockProps) {

	const [formValues, setFormValues] = useState({ fromName: '', fromEmail: '' })
	const [error, setError] = useState<Error | undefined>()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState<boolean | undefined>()
	const fileInput = useRef<HTMLInputElement | null>(null)

	const handleInputChange = ({ target: { id, value } }) => {
		setFormValues({ ...formValues, [id]: value })
	}

	const createUpload = (file: File) => {
		return client.uploads.createFromFileOrBlob({
			// File object to upload
			fileOrBlob: file,
			// if you want, you can specify a different base name for the uploaded file
			filename: 'different-image-name.png',
			// skip the upload and return an existing resource if it's already present in the Media Area:
			skipCreationIfAlreadyExists: true,
			// be notified about the progress of the operation.
			onProgress: (info) => {
				// info.type can be one of the following:
				//
				// * DOWNLOADING_FILE: client is downloading the asset from the specified URL
				// * REQUESTING_UPLOAD_URL: client is requesting permission to upload the asset to the DatoCMS CDN
				// * UPLOADING_FILE: client is uploading the asset
				// * CREATING_UPLOAD_OBJECT: client is finalizing the creation of the upload resource
				console.log('Phase:', info.type);
				// Payload information depends on the type of notification
				console.log('Details:', info.payload);
			},
			// specify some additional metadata to the upload resource
			author: 'New author!',
			copyright: 'New copyright',
			default_field_metadata: {
				en: {
					alt: 'Pdf upload',
					title: 'Pdf upload',
				},
			},
		});
	}

	useEffect(() => {
		if (fileInput.current === null) return

		fileInput.current.addEventListener('change', async (event) => {
			const files = event.target.files;
			for (let file of files) {
				createUpload(file).then((upload) => console.log(upload));
			}
		});
	}, [fileInput])

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
										return <input id={id} type="file" ref={fileInput} {...props} />
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
				{success && 'Mailet skickades!'}
			</form>
		</section>
	)
}