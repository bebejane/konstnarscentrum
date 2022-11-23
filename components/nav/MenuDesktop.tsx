import s from './MenuDesktop.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { districts } from "/lib/district";
import { useStore, shallow } from '/lib/store'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import type { Menu, MenuItem } from '/lib/menu'
import { DistrictSelector } from '/components'

export type MenuDesktopProps = { items: Menu }

export default function MenuDesktop({ items }: MenuDesktopProps) {

	const ref = useRef();
	const router = useRouter()
	const [marginLeft, setMarginLeft] = useState<string>('0px')
	const [selected, setSelected] = useState<MenuItem | undefined>()
	const [district, setDistrict] = useState<string | undefined>()
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
		const path = router?.asPath.split('/')[1];
		setDistrict(districts.find(el => el.slug === path)?.slug)
	}, [router, setDistrict])

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
								<Link href={item.slug}>
									{item.label}
								</Link>
								:
								<>{item.label}</>
							}
						</li>
					)}
					<li className={s.district}>
						<DistrictSelector />
					</li>
				</ul>
				<div>

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
								{item.sub?.map(({ slug, label }, idx) =>
									<li key={idx}>
										<Link href={slug}>
											{label}
										</Link>
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
