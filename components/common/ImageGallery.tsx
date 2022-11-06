import styles from './ImageGallery.module.scss'
import React from 'react'
import { Image } from 'react-datocms'

type ImageGalleryBlockProps = { data: ImageGalleryRecord , onClick:Function}

export default function ImageGallery({ data: { gallery }, onClick }: ImageGalleryBlockProps) {

	return (
		<div className={styles.imageGallery}>
			{gallery.map((image, idx) =>
				<figure key={idx} onClick={()=>onClick(image.id)} data-image-zoom={gallery.length >=4 ? 'small' : 'medium'}>
					<Image
						data={image.responsiveImage}
						className={styles.image}
					/>
				</figure>
			)}
		</div>
	)
}