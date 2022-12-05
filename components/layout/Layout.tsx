import styles from './Layout.module.scss'
import React, { useEffect } from 'react'
import { Content, Footer, MenuDesktop, MenuMobile, Logo, Grid, Search } from '/components'
import { regions } from '/lib/region'
import type { MenuItem } from '/lib/menu'
import { useState } from 'react'
import { buildMenu } from '/lib/menu'
import { useRouter } from 'next/router'

export type LayoutProps = { children: React.ReactNode, menu: MenuItem[], title: string, footer: FooterRecord }

export default function Layout({ children, menu: menuFromProps, title, footer }: LayoutProps) {

	const router = useRouter()
	const isHome = router.asPath === '/' || regions.find(({ slug }) => slug === router.asPath.replace('/', '')) !== undefined
	const [menu, setMenu] = useState(menuFromProps)

	useEffect(() => { // Refresh menu on load.
		buildMenu().then(res => setMenu(res)).catch(err => console.error(err))
	}, [])

	return (
		<>
			<Logo disabled={!isHome} />
			<MenuMobile items={menu} home={isHome} />
			{!isHome && <MenuDesktop items={menu} home={isHome} />}
			<div className={styles.layout}>
				<Content noMargins={isHome}>
					{children}
				</Content>
				<Search />
			</div>
			<Footer menu={menu} footer={footer} />
			<Grid />
		</>
	)
}