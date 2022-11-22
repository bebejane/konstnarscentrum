import React, { useEffect, useState, useRef } from 'react'
import styles from './Content.module.scss'
import { usePage } from '/lib/context/page'

export type ContentProps = { children: React.ReactNode }

export default function Content({ children }: ContentProps) {

	const { layout } = usePage()

	return (
		<main id="content" className={styles.content} data-type={layout}>
			<article>
				{children}
			</article>
		</main>
	)
}