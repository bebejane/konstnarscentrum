import s from './MenuMobile.module.scss'
import cn from 'classnames'
import { useStore } from '/lib/store'
import { regions } from '/lib/region'
import { Twirl as Hamburger } from "hamburger-react";
import React, { useEffect, useRef, useState } from 'react';
import type { Menu, MenuItem } from '/lib/menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useScrollInfo } from 'dato-nextjs-utils/hooks';
import useDevice from '/lib/hooks/useDevice';
import { useTheme } from 'next-themes';
import { setCookie, getCookie } from 'cookies-next';
import { useRegion } from '/lib/context/region';

export type MenuMobileProps = { items: Menu, home: boolean }

const englishMenuItem: MenuItem = {
	type: 'language',
	label: 'English',
	slug: '/english',
	index: true
}

export default function MenuMobile({ items, home }: MenuMobileProps) {

	const router = useRouter()
	const { theme, setTheme } = useTheme()
	const region = useRegion()
	const isHome = router.asPath === '/' || regions?.find(({ slug }) => slug === router.asPath.replace('/', '')) !== undefined
	const { scrolledPosition } = useScrollInfo()
	const [selected, setSelected] = useState<MenuItem | undefined>();
	const [showRegions, setShowRegions] = useState<boolean>(false);
	const { isDesktop } = useDevice()
	const [showMenuMobile, setShowMenuMobile, invertedMenu, setInvertedMenu, setShowSearch] = useStore((state) => [state.showMenuMobile, state.setShowMenuMobile, state.invertedMenu, state.setInvertedMenu, state.setShowSearch])
	const regionsRef = useRef<HTMLLIElement | null>(null)

	const allItems = [...items, englishMenuItem]

	const handleSearch = (e) => {
		setShowSearch(true)
		setShowMenuMobile(false)
	}

	const handleRegionChange = (regionId) => {
		const region = regions.find(({ id }) => id === regionId)
		setCookie('region', region.slug)
		setShowRegions(false)
	}

	useEffect(() => {
		if (!isHome || isDesktop)
			return setInvertedMenu(false)

		const homeGallery = document.getElementById('home-gallery')
		setInvertedMenu(!showMenuMobile && scrolledPosition < homeGallery.getBoundingClientRect().height)

	}, [isDesktop, isHome, scrolledPosition, setInvertedMenu, showMenuMobile])

	useEffect(() => {
		if (showMenuMobile)
			setTheme('light')
	}, [showMenuMobile, setTheme])

	useEffect(() => {
		if (showRegions && regionsRef.current !== null)
			regionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}, [showRegions, regionsRef])

	useEffect(() => {
		const menuItem = [...items, englishMenuItem].find(({ slug, sub }) => slug === router.asPath || sub.find(({ slug }) => slug === router.asPath))
		const item = menuItem.slug === router.asPath ? menuItem : menuItem.sub.find(({ slug }) => slug === router.asPath)
		item && setSelected(item)
	}, [router, items])

	return (
		<>
			<div className={s.hamburger}>
				<Hamburger
					toggled={showMenuMobile}
					onToggle={setShowMenuMobile}
					color={invertedMenu || (theme === 'dark' && !showMenuMobile) ? '#ffffff' : '#121212'}
					duration={0.5}
					label={"Menu"}
					size={24}
				/>
			</div>
			<div className={cn(s.mobileMenu, showMenuMobile && s.show)}>
				<nav>
					<ul className={s.nav}>
						{allItems.map((item, idx) =>
							<React.Fragment key={idx}>
								<li
									data-slug={item.slug}
									className={cn(selected?.type === item.type && s.selected)}
									onClick={() => setSelected(selected?.type === item.type ? undefined : item)}
								>
									{item.index ?
										<Link href={item.slug}>
											{item.label}
										</Link>
										:
										<>{item.label}</>
									}
								</li>
								{item.type === selected?.type && !item.index &&
									item.sub?.map(({ slug, label }, idx) =>
										<li className={s.sub} key={`sub-${idx}`}>
											<Link href={slug}>
												{label}
											</Link>
										</li>
									)
								}
							</React.Fragment>
						)}
					</ul>
					<ul className={s.footer}>
						<li onClick={handleSearch}>
							Sök
						</li>
						<li ref={regionsRef} onClick={() => setShowRegions(!showRegions)}>
							Region <img className={cn(s.caret, showRegions && s.open)} src="/images/caret.png" />
						</li>
						{showRegions && regions.map(({ id, name, slug }, idx) =>
							<li key={idx} className={cn(s.sub, region.id === id && s.selected)}>
								<Link
									href={`/${slug}`}
									onClick={() => handleRegionChange(id)}
								>
									{name}
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</>
	)
}
