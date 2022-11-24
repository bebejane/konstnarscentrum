import s from './MenuMobile.module.scss'
import cn from 'classnames'
import { useStore, shallow } from '/lib/store'
import { Twirl as Hamburger } from "hamburger-react";
import { useState } from 'react';
import type { Menu, MenuItem } from '/lib/menu';
import Link from 'next/link';

export type MenuMobileProps = { items: Menu }

const englishMenuItem: MenuItem = { type: 'language', label: 'English', slug: '/english' }

export default function MenuMobile({ items }: MenuMobileProps) {

	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<MenuItem | undefined>();
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
			<div className={cn(s.mobileMenu, showMenuMobile && s.show)}>
				<nav>
					<ul className={s.nav}>
						{[...items, englishMenuItem].map((item, idx) =>
							<>
								<li
									key={idx}
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
							</>
						)}
					</ul>
				</nav>
			</div>
		</>
	)
}
