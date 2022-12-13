import s from './MenuMobile.module.scss'
import cn from 'classnames'
import { useStore } from '/lib/store'
import { regions } from '/lib/region'
import { Twirl as Hamburger } from "hamburger-react";
import React, { useState } from 'react';
import type { Menu, MenuItem } from '/lib/menu';
import Link from 'next/link';

export type MenuMobileProps = { items: Menu, home: boolean }

const englishMenuItem: MenuItem = {
	type: 'language',
	label: 'English',
	slug: '/english',
	index: true
}

export default function MenuMobile({ items, home }: MenuMobileProps) {

	const [selected, setSelected] = useState<MenuItem | undefined>();
	const [showRegions, setShowRegions] = useState<boolean>(false);
	const [showMenuMobile, setShowMenuMobile] = useStore((state) => [state.showMenuMobile, state.setShowMenuMobile])

	return (
		<>
			<div className={s.hamburger}>
				<Hamburger
					toggled={showMenuMobile}
					onToggle={setShowMenuMobile}
					color={'#121212'}
					duration={0.5}
					label={"Menu"}
					size={24}
				/>
			</div>
			<div
				className={cn(s.mobileMenu, showMenuMobile && s.show)}
			//onClick={({ target: { tagName } }) => tagName === 'A' && setShowMenuMobile(false)}
			>
				<nav>
					<ul className={s.nav}>
						{[...items, englishMenuItem].map((item, idx) =>
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
						<li>
							Sök
						</li>
						<li onClick={() => setShowRegions(!showRegions)}>
							Region <img className={cn(s.caret, showRegions && s.open)} src="/images/caret.png" />
						</li>
						{showRegions && regions.map(({ name, slug }, idx) =>
							<li key={idx} className={s.sub}>
								<Link href={`/${slug}`}>
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
