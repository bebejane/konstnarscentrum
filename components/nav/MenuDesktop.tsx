import s from './MenuDesktop.module.scss'
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
	const [subMarginLeft, setSubMarginLeft] = useState<string>('100px')
	const [selected, setSelected] = useState<MenuItem | undefined>()

	useEffect(() => {
		if (typeof selected === 'undefined') return
		const bounds = document.querySelector(`[data-menu-type="${selected.type}"]`).getBoundingClientRect()

		setSubMarginLeft(`${bounds.left}px`)
	}, [selected])
	console.log(selected);

	return (
		<>
			<nav id={'menu'} ref={ref} className={s.menu}>
				<ul className={s.nav} >
					{items.map((item, idx) =>
						<li
							key={idx}
							data-menu-type={item.type}
							onMouseEnter={() => setSelected(item)}
						>
							{item.label}
						</li>
					)}
					<li>
						<DistrictSelector />
					</li>
				</ul>
			</nav>
			{items.map(({ sub, slug, type }, i) => {
				return (
					<ul
						key={i}
						data-sub-type={type}
						style={{ left: subMarginLeft }}
						className={cn(s.sub, selected?.type === type && s.show)}
						onMouseLeave={() => setSelected(undefined)}
					>
						{sub?.map(({ slug, label }, idx) =>
							<li key={idx}>
								<Link href={slug}>
									{label}
								</Link>
							</li>
						)}
					</ul>
				)
			})}
		</>
	)
}
