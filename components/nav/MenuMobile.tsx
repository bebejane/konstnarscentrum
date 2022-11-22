import styles from './MenuMobile.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useStore, shallow } from '/lib/store'
import { Twirl as Hamburger } from "hamburger-react";
import type { Menu } from '/lib/menu'

export type MenuMobileProps = { items: Menu }

export default function MenuMobile({ items }: MenuMobileProps) {

	const router = useRouter()

	return (
		<>
			<div className={styles.hamburger}>
				<Hamburger
					toggled={true}
					duration={0.5}
					label={"Menu"}
					size={24}
				/>
			</div>
			<div className={cn(styles.mobileMenu)}>
				<nav className={styles.main}>
					<ul className={styles.nav}>
						{items.map((item, idx) =>
							<li
								data-slug={item.slug}
								key={idx}
							>
								{item.label}
							</li>
						)}
					</ul>
				</nav>
			</div>
		</>
	)
}
