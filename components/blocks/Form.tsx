import s from './Form.module.scss'
import React from 'react'

export type ButtonBlockProps = { data: FormRecord, onClick: Function }

export default function Form({ data: { id, field, reciever, subject }, onClick }: ButtonBlockProps) {

	return (
		<section>
			Form section
		</section>
	)
}