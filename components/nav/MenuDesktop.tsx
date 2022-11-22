import styles from './MenuDesktop.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useStore, shallow } from '/lib/store'
import { useWindowSize } from 'rooks'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import type { Menu, MenuItem } from '/lib/menu'
import { DistrictSelector } from '/components'

export type MenuDesktopProps = { items: Menu }

export default function MenuDesktop({ items }: MenuDesktopProps) {


	const ref = useRef();
	const router = useRouter()
	const [selected, setSelected] = useState<MenuItem | undefined>()

	return (
		<>
			<nav id={'menu'} ref={ref} className={styles.menu}>
				<ul className={styles.nav} >
					{items.map((item, idx) =>
						<li
							key={idx}
							onMouseEnter={() => setSelected(item)}
							onMouseLeave={() => setSelected(undefined)}
						>
							{item.label}
						</li>
					)}
				</ul>
				<DistrictSelector />
			</nav>
		</>
	)
}
