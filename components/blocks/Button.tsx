import styles from './Button.module.scss'
import React from 'react'
import Link from 'next/link'

export type ButtonBlockProps = { data: ButtonRecord , onClick:Function}

export default function Button({ data: { text, url }, onClick }: ButtonBlockProps) {

	return (
		<Link className={styles.button} href={url}>
			<button>{text}</button>
		</Link>
	)
}