import s from './ImageGallery.module.scss'
import cn from 'classnames'
import React, { useCallback } from 'react'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import { KCImage as Image } from '/components'
import { useState, useRef, useEffect } from 'react';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import { useWindowSize } from 'rooks';

export type ImageGalleryBlockProps = { id: string, images: FileField[], onClick?: Function, editable?: boolean }

export default function ImageGallery({ id, images, onClick, editable = false }: ImageGalleryBlockProps) {

	const swiperRef = useRef<Swiper | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [index, setIndex] = useState(0)
	const [arrowMarginTop, setArrowMarginTop] = useState(0)
	const { innerHeight, innerWidth } = useWindowSize()

	const calculateNextArrowPosition = useCallback(() => {
		Array.from(containerRef.current.querySelectorAll<HTMLImageElement>('picture>img')).forEach(img =>
			setArrowMarginTop((state) => img.clientHeight > state ? img.clientHeight / 2 : state)
		)
	}, [setArrowMarginTop])

	useEffect(() => {
		calculateNextArrowPosition()
	}, [innerHeight, innerWidth, calculateNextArrowPosition])

	return (
		<div className={s.gallery} data-editable={editable} ref={containerRef}>
			<div className={s.fade}></div>
			<SwiperReact
				id={`${id}-swiper-wrap`}
				className={cn(s.swiper)}
				loop={true}
				noSwiping={false}
				simulateTouch={true}
				slidesPerView='auto'
				initialSlide={index}
				onSlideChange={({ realIndex }) => setIndex(realIndex)}
				onSwiper={(swiper) => swiperRef.current = swiper}
			>
				{images.map((item, idx) =>
					<SwiperSlide key={`${idx}`} className={cn(s.slide)}>
						<figure id={`${id}-${item.id}`} onClick={() => onClick?.(item.id)}>
							<Image
								data={item.responsiveImage}
								className={s.image}
								pictureClassName={s.picture}
								objectFit={'cover'}
								onLoad={calculateNextArrowPosition}
							/>
							{item.title &&
								<figcaption>
									<Markdown allowedElements={['em', 'p']}>{item.title}</Markdown>
								</figcaption>
							}
						</figure>
					</SwiperSlide>
				)}
			</SwiperReact>
			{images.length > 3 &&
				<div
					className={s.next}
					style={{ top: `${arrowMarginTop}px` }}
					onClick={() => swiperRef.current?.slideNext()}

				>→</div>
			}
		</div>
	)
}