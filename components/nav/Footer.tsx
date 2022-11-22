import styles from './Footer.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import type { MenuItem } from '/lib/menu'
import { usePage } from '/lib/context/page'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useStore, { shallow } from '/lib/store'

export type FooterProps = { menu: MenuItem[] }

export default function Footer({ menu }: FooterProps) {

	const router = useRouter()

	return (
		<>
			<footer className={cn(styles.footer)} id="footer">
				<nav className={styles.menu}>
					<ul>
						{menu.map((item, idx) => {
							return (
								<li key={idx}>

									<ul className={styles.category}>
										<>
											<li>{item.label}</li>
											{item.sub?.map((subItem, subidx) =>
												<li key={subidx}>
													<Link scroll={false} href={subItem.slug}>
														{subItem.label}
													</Link>
												</li>
											)}
										</>
									</ul>
								</li>
							)
						})}
					</ul>
				</nav>
			</footer>
		</>
	)
}