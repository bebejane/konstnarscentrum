import "swiper/css";
import styles from './Gallery.module.scss'
import cn from 'classnames'
import React from 'react'
import { Image } from "react-datocms"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useRef, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper'
import { Modal } from "/components";

import { Loader } from '/components'

export type GalleryProps = {
  images: FileField[],
  onClose: (event?: React.MouseEvent) => void,
  index: number,
  show: boolean
}

export default function Gallery({ images, onClose, index = 0, show }: GalleryProps) {

  const swiperRef = useRef<SwiperType | undefined>()
  const [realIndex, setRealIndex] = useState(0)
  const [title, setTitle] = useState<string>()
  const [loaded, setLoaded] = useState<any>({})
  const [initLoaded, setInitLoaded] = useState(false)
  const isSingleSlide = images?.length === 1
  const isHidden = !images || !show;

  useEffect(() => {
    if (images)
      setTitle(images[realIndex]?.title)
  }, [realIndex, images, setTitle])

  useEffect(() => {
    setRealIndex(index)
  }, [index])

  useEffect(() => { // handle  keys
    const handleKeys = ({ key }) => {
      if (isHidden) return
      if (key === 'ArrowRight') swiperRef?.current?.slideNext()
      if (key === 'ArrowLeft') swiperRef?.current?.slidePrev()
      if (key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [onClose, isHidden])

  useEffect(() => {
    setTimeout(() => setInitLoaded(true), 300)
  }, [initLoaded]) // Delay loader

  if (isHidden)
    return null

  return (
    <Modal>
      <div className={cn(styles.gallery, images.length <= 1 && styles.noArrows, isSingleSlide && styles.noArrows)}>
        <div className={styles.back} onClick={() => swiperRef.current.slidePrev()}><img src="/images/arrow-light.svg" className={styles.arrow} /></div>
        <div className={styles.images} onClick={() => !isSingleSlide && swiperRef?.current?.slideNext()}>
          <Swiper
            id={`main-gallery`}
            loop={true}
            spaceBetween={500}
            simulateTouch={!isSingleSlide}
            slidesPerView={1}
            initialSlide={index}
            onSlideChange={({ realIndex }) => setRealIndex(realIndex)}
            onSwiper={(swiper) => swiperRef.current = swiper}
          >
            {images.map((image, idx) =>
              <SwiperSlide key={idx} className={cn(styles.slide)}>
                {image.responsiveImage ?
                  <Image
                    pictureClassName={styles.image}
                    data={image.responsiveImage}
                    lazyLoad={false}
                    usePlaceholder={false}
                    onLoad={() => setLoaded({ ...loaded, [image.id]: true })}
                  />
                  :
                  <div className={styles.svg}>
                    <img
                      src={image.url}
                      className={styles.image}
                      onLoad={() => setLoaded({ ...loaded, [image.id]: true })}
                    />
                  </div>
                }
                {/*!loaded[image.id] && initLoaded &&
                  <div className={styles.loading}><Loader /></div>
                */}
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className={styles.forward} onClick={() => swiperRef.current.slideNext()}><img src="/images/arrow-light.svg" className={styles.arrow} /></div>
        <div className={styles.caption}>{title && <p className="medium">{title}</p>}</div>
        <div className={styles.close} onClick={onClose}>×</div>
      </div>
    </Modal>
  )
}