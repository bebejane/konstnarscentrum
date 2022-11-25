import React from 'react'
import styles from './Content.module.scss'

export type ContentProps = { children: React.ReactNode }

export default function Content({ children }: ContentProps) {

	return (
		<main id="content" className={styles.content}>
			<div className={styles.wrapper}>
				<article>
					{children}
				</article>
			</div>
		</main>
	)
}