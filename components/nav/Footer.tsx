import s from './Footer.module.scss'
import cn from 'classnames'
import type { MenuItem } from '/lib/menu'
import Logo from '/public/images/logo-round.svg'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import { useInView } from 'react-intersection-observer'
import { RegionLink } from '/components'
import { useRegion } from '/lib/context/region'
import { useEffect } from 'react'

export type FooterProps = {
	menu: MenuItem[],
	footer: FooterRecord
	regions: RegionRecord[]
}

export default function Footer({ menu, footer, regions }: FooterProps) {

	const { inView, ref } = useInView()
	const region = useRegion()
	const sponsors = regions?.find(el => el.id === region.id)?.sponsors

	useEffect(() => {
		document.body.classList.toggle('invert', inView)
	}, [inView])

	return (
		<>
			<footer className={cn(s.footer)} id="footer" ref={ref}>
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
														<RegionLink scroll={true} href={item.slug} regional={item.regional}>
															{item.label}
														</RegionLink>
													</strong></li>

													:
													<li>
														<strong>{item.label}</strong>
													</li>
												}

												{item.sub?.map((subItem, subidx) =>
													<li key={subidx}>
														<RegionLink scroll={true} href={subItem.slug} regional={subItem.regional}>
															{subItem.label}
														</RegionLink>
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
					<div className={s.sponsors}>
						{sponsors && sponsors.length > 0 &&
							<ul>
								<li>Med stöd av</li>
								{sponsors.map(({ image, url }, idx) =>
									<li key={idx}>
										<img src={image.url} className={s.image} />
									</li>
								)}
							</ul>
						}
					</div>
					<div className={cn(s.logo, inView && s.inview)}>
						<Logo />
					</div>
				</section>
			</footer>
		</>
	)
}