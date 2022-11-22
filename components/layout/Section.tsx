import React, { useEffect, useState, useRef } from 'react'
import styles from './Section.module.scss'
import cn from 'classnames'
import { sectionId } from '/lib/utils'
import { usePage } from '/lib/context/page'
import { useInView } from 'react-intersection-observer';

export type SectionProps = {
	children?: React.ReactNode,
	className?: string,
	type?: string,
	name?: string,
	id?: string,
	top?: boolean,
	bottom?: boolean,
	bgColor?: string,
	disableSidebar?: boolean,
	fadeColor?: string
}

export default function Section({
	children,
	className,
	type,
	top,
	bottom
}: SectionProps) {

	return (

		<section
			className={styles.section}
			data-type={type}
			data-top={top}
			data-bottom={bottom}
		>
			<div className={cn(styles.wrap, className)}>
				{children}
			</div>
		</section>
	)
}