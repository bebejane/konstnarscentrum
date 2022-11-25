import s from './MenuDesktop.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { regions } from "/lib/region";
import { useStore, shallow } from '/lib/store'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import type { Menu, MenuItem } from '/lib/menu'
import { RegionSelector, RegionLink } from '/components'

export type MenuDesktopProps = { items: Menu }

export default function MenuDesktop({ items }: MenuDesktopProps) {

	const ref = useRef();
	const router = useRouter()
	const [marginLeft, setMarginLeft] = useState<string>('0px')
	const [selected, setSelected] = useState<MenuItem | undefined>()
	const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])
	const { isPageBottom, isPageTop, isScrolledUp, scrolledPosition } = useScrollInfo()

	useEffect(() => { // Toggle menu bar on scroll
		setShowMenu((isScrolledUp && !isPageBottom) || isPageTop)
	}, [scrolledPosition, isPageBottom, isPageTop, isScrolledUp, setShowMenu]);


	useEffect(() => {
		if (typeof selected === 'undefined')
			return

		const el = document.querySelector<HTMLUListElement>(`[data-menu-type="${selected.type}"]`)
		setMarginLeft(`${el.offsetLeft}px`)
	}, [selected])

	useEffect(() => {
		setSelected(undefined)
	}, [router])

	return (
		<>
			<nav id="menu" ref={ref} className={cn(s.menu, showMenu && s.show)}>
				<ul
					className={s.nav}
					onMouseLeave={() => setSelected(undefined)}
				>
					{items.map((item, idx) =>
						<li
							key={idx}
							data-menu-type={item.type}
							onMouseEnter={() => setSelected(item)}
						>
							{item.index ?
								<RegionLink href={item.slug} regional={item.regional}>
									{item.label}
								</RegionLink>
								:
								<>{item.label}</>
							}
						</li>
					)}
					<li className={s.region}>
						<RegionSelector />
					</li>
				</ul>
				<div className={s.background}>

					{items.map((item, i) => {
						return (
							<ul
								key={i}
								data-sub-type={item.type}
								style={{ marginLeft }}
								className={cn(s.sub, selected?.type === item.type && !selected.index && s.show)}
								onMouseLeave={() => setSelected(undefined)}
								onMouseMove={() => setSelected(item)}
							>
								{item.sub?.map(({ slug, label, regional }, idx) =>
									<li key={idx}>
										<RegionLink href={slug} regional={regional}>
											{label}
										</RegionLink>
									</li>
								)}
							</ul>
						)
					})}
				</div>
			</nav>
		</>
	)
}
