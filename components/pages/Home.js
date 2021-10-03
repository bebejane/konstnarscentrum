import styles from "./Home.module.scss";
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  adaptiveHeight:true,
  speed: 500,
  centerMode:true,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: styles.slide
}
export default function Home(data) {
  console.log(data)
  const slideshow = data.slideshow;
  
	return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div><h2>Konst Centrum</h2></div>
        <div><Link href={"/member"}>Medlemmar</Link></div>
      </div>
      <div className={styles.slideshow}>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
        >
          {slideshow.map(({image:{url}, headline}, idx) => 
            <SwiperSlide key={idx}>
              <div  className={styles.slide}>
                <div>{headline}</div>
                <img src={url}/>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  )
}