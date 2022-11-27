import s from './Content.module.scss'
import cn from 'classnames'
import React from 'react'

export type ContentProps = {
	children: React.ReactNode,
	noMargins?: boolean
}

export default function Content({ children, noMargins = false }: ContentProps) {

	return (
		<main id="content" className={cn(s.content, noMargins && s.nomargins)}>
			<div className={s.wrapper}>
				<article>
					{children}
				</article>
			</div>
		</main>
	)
}