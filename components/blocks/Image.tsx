import styles from './Image.module.scss'
import React from 'react'
import { Image as DatoImage } from 'react-datocms'
import { ImageGallery } from '/components'
export type ImageBlockProps = { data: ImageRecord, onClick: Function }

export default function Image({ data: { image: images }, onClick }: ImageBlockProps) {

	return (
		<DatoImage data={images[0].responsiveImage} />
	)
}