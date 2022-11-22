import styles from './Layout.module.scss'
import React, { useEffect } from 'react'
import { Content, Footer, MenuDesktop, MenuMobile, Logo } from '/components'
import { usePage } from '/lib/context/page'
import type { MenuItem } from '/lib/menu'
import { useStore, shallow } from '/lib/store'
import { useState } from 'react'
import { buildMenu } from '/lib/menu'

export type LayoutProps = { children: React.ReactNode, menu: MenuItem[], title: string }

export default function Layout({ children, menu: menuFromProps, title }: LayoutProps) {

	const { color, layout, sidebar } = usePage()
	const [menu, setMenu] = useState(menuFromProps)

	useEffect(() => { // Refresh menu on load.
		buildMenu().then(res => setMenu(res)).catch(err => console.error(err))
	}, [])

	return (
		<>
			<MenuDesktop items={menu} />
			<MenuMobile items={menu} />
			<div className={styles.layout}>
				<Logo />
				<Content>
					{children}
				</Content>
			</div>
			<Footer menu={menu} />
		</>
	)
}