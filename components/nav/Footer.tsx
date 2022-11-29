import s from './Footer.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import type { MenuItem } from '/lib/menu'
import Logo from '/public/images/logo-round.svg'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import { useInView } from 'react-intersection-observer'

export type FooterProps = { menu: MenuItem[], footer: FooterRecord }

export default function Footer({ menu, footer }: FooterProps) {

	const { inView, ref } = useInView()

	return (
		<>
			<footer className={cn(s.footer)} id="footer">
				<section className={s.menu}>
					<nav>
						<ul>
							{menu.map((item, idx) => {
								return (
									<li key={idx}>
										<ul className={s.category}>
											<>
												{item.index ?
													<li><strong>
														<Link scroll={true} href={item.slug}>
															{item.label}
														</Link>
													</strong></li>

													:
													<li>
														<strong>{item.label}</strong>
													</li>
												}

												{item.sub?.map((subItem, subidx) =>
													<li key={subidx}>
														<Link scroll={true} href={subItem.slug}>
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
				</section>

				<section className={s.about}>
					<Markdown>
						{footer?.aboutKc}
					</Markdown>
				</section>

				<section className={s.social}>
					<div>
						<span>Följ oss</span>
						<span>Instagram</span>
						<span>Facebook</span>
					</div>
					<div className={s.copyright}>
						<span>Copyright Konstnärscentrum 2022</span><span>GDPR & Cookies</span>
					</div>
				</section>

				<section className={s.support}>
					Med stöd av
					<div></div>
					<div className={cn(s.logo, inView && s.inview)} ref={ref}>
						<Logo />
					</div>
				</section>
			</footer>
		</>
	)
}