import s from './Layout.module.scss'
import cn from 'classnames'
import React, { useEffect } from 'react'
import { Content, Footer, MenuDesktop, MenuMobile, Logo, Grid, Search, FullscreenGallery } from '/components'
import type { MenuItem } from '/lib/menu'
import { useState } from 'react'
import { buildMenu } from '/lib/menu'
import { useRouter } from 'next/router'
import { useStore, shallow } from '/lib/store'

export type LayoutProps = {
	children: React.ReactNode,
	menu: MenuItem[],
	title: string,
	footer: FooterRecord,
	regions: RegionRecord[]
}

export default function Layout({ children, menu: menuFromProps, title, footer, regions }: LayoutProps) {

	const router = useRouter()
	const [images, imageId, setImageId] = useStore((state) => [state.images, state.imageId, state.setImageId], shallow)
	const isHome = router.asPath === '/' || regions?.find(({ slug }) => slug === router.asPath.replace('/', '')) !== undefined
	const [menu, setMenu] = useState(menuFromProps)

	useEffect(() => { // Refresh menu on load.
		buildMenu().then(res => setMenu(res)).catch(err => console.error(err))
	}, [])

	return (
		<>
			<MenuMobile items={menu} home={isHome} />
			{!isHome &&
				<MenuDesktop items={menu} home={isHome} />
			}
			<div className={s.layout}>
				<Logo fixed={!isHome} />
				<Content noMargins={isHome}>
					{children}
				</Content>
				<Search />
			</div>
			<Footer menu={menu} footer={footer} regions={regions} />
			<FullscreenGallery
				index={images?.findIndex((image) => image?.id === imageId)}
				images={images}
				show={imageId !== undefined}
				onClose={() => setImageId(undefined)}
			/>
			<Grid />
		</>
	)
}