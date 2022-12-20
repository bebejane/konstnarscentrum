import s from './ImageGallery.module.scss'
import cn from 'classnames'
import React from 'react'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import { Image } from 'react-datocms'
import { useState, useRef, useEffect } from 'react';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type ImageGalleryBlockProps = { id: string, images: FileField[], onClick?: Function, editable?: boolean }

export default function ImageGallery({ id, images, onClick, editable = false }: ImageGalleryBlockProps) {

	const swiperRef = useRef<Swiper | null>(null)
	const [index, setIndex] = useState(0)

	return (
		<div className={s.gallery} data-editable={editable}>
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
						<figure onClick={() => onClick?.(item.id)}>
							<Image
								data={item.responsiveImage}
								className={s.image}
								pictureClassName={s.picture}
								objectFit={'cover'}
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
		</div>
	)
}