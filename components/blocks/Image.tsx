import s from './Image.module.scss'
import cn from 'classnames'
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
			<figure className={s.single}>
				<DatoImage
					data={images[0].responsiveImage}
					className={s.image}
					fadeInDuration={0}
				/>
				{images[0].title &&
					<figcaption>{images[0].title}</figcaption>
				}			</figure>
			: isDouble ?
				<div className={s.double}>
					<figure>
						<DatoImage
							data={images[0].responsiveImage}
							className={s.image}
							fadeInDuration={0}
						/>
						{images[0].title &&
							<figcaption>{images[0].title}</figcaption>
						}
					</figure>
					<figure>
						<DatoImage
							data={images[1].responsiveImage}
							className={s.image}
							fadeInDuration={0}
						/>
						{images[1].title &&
							<figcaption>{images[1].title}</figcaption>
						}					</figure>
				</div>
				: isGallery ? <ImageGallery id={id} images={images} /> : null
	)
}