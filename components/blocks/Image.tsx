import styles from './Image.module.scss'
import React from 'react'
import { Image as DatoImage } from 'react-datocms'
import { ImageGallery } from '/components'

export type ImageBlockProps = { id: string, data: ImageRecord, onClick: Function }

export default function Image({ id, data: { image: images }, onClick }: ImageBlockProps) {

	const isSingle = images.length === 1
	const isDouble = images.length === 2
	const isGallery = images.length > 2;

	return (
		isSingle ?
			<figure className={styles.single}>
				<DatoImage data={images[0].responsiveImage} className={styles.image} fadeInDuration={1000} />
			</figure>
			: isDouble ?
				<div className={styles.double}>
					<figure>
						<DatoImage data={images[0].responsiveImage} className={styles.image} fadeInDuration={1000} />
					</figure>
					<figure>
						<DatoImage data={images[1].responsiveImage} className={styles.image} fadeInDuration={1300} />
					</figure>
				</div>
				: isGallery ?
					<ImageGallery id={id} images={images} />
					:
					null
	)
}