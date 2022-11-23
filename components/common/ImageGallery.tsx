import styles from './ImageGallery.module.scss'
import cn from 'classnames'
import React from 'react'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import { Image } from 'react-datocms'
import { useState, useRef, useEffect } from 'react';

export type ImageGalleryBlockProps = { id: string, images: FileField[], onClick?: Function }

export default function ImageGallery({ id, images, onClick }: ImageGalleryBlockProps) {

	const swiperRef = useRef<Swiper | null>(null)
	const [index, setIndex] = useState(0)

	return (
		<div className={styles.gallery}>
			<SwiperReact
				id={`${id}-swiper-wrap`}
				className={cn(styles.swiper)}
				loop={true}
				noSwiping={false}
				simulateTouch={true}
				slidesPerView={3}
				spaceBetween={20}
				initialSlide={index}
				onSlideChange={({ realIndex }) => setIndex(realIndex)}
				onSwiper={(swiper) => swiperRef.current = swiper}
			>
				{images.map((item, idx) =>
					<SwiperSlide key={`${idx}`} className={cn(styles.slide)}>
						<figure>
							<Image
								data={item.responsiveImage}
								className={styles.image}
								fadeInDuration={0}
							/>
							<figcaption>{item.title}</figcaption>
						</figure>
					</SwiperSlide>
				)}
			</SwiperReact>
		</div>
	)
}