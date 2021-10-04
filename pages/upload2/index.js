import styles from "./Upload.module.scss";
import Link from "next/link"
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { Image } from 'react-datocms';

import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const initialStatus = {status:"idle", totalProgress:0, item:0, percent:0, total:0, images:[]}

export default function Upload(data) {
  
  const [progress, setProgress] = useState(initialStatus)
  const [error, setError] = useState()
  const [swiper, setSwiper] = useState()
  const token = 'hej token'

  const onChange = async (formData) => {

    try{

      const files = []
      const images = []
      
      for(var pair of formData.entries())
        files.push(pair[1])
      
      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx]
        const {name : filename} = file
        setProgress(progress => {return {...progress, item:idx+1, total:files.length, percent:0, status: "requesting"}})
        let res = await axios.post('/api/s3upload', {filename, token})
        const {id, s3url} = res.data;
        res = await axios.put(s3url, file, { headers: {'Content-Type': file.type},
          onUploadProgress: (event) => setProgress(progress => { return {
            ...progress,
            status: "uploading",
            percent: Math.round((event.loaded * 100) / event.total),
            totalProgress: Math.round((idx/files.length)*100) + (Math.round((event.loaded * 100) / event.total)/files.length),
            item:idx+1,
            total:files.length,
          }})
        })
        setProgress(progress => { return {...progress, status:"processing"}})
        res = await axios.post('/api/s3upload', {s3url, id})
        images.push(res.data)
        setProgress(progress => { return {...progress, images}})
      }
      setProgress({
        status: "done",
        percent: 100,
        totalProgress: 100,
        item:files.length,
        total:files.length,
        images
      })
    }catch(err){
      setError(err)
    }
  };
  const handleSwiper = (swiper) => {
    console.log(swiper)
  }
  const {images} = progress;

	return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div className={styles.header}>
          <div><h2>Upload</h2></div>
        </div>
        <h2>Uploading</h2>
        <progress value={progress.percent} max={100}/>
        <progress value={progress.totalProgress} max={100}/>
        <div className={styles.status}>
          Status: {progress.status} {progress.item}/{progress.total} ({progress.percent}%)  
        </div>
        {progress.status === 'done' && <h2>Done!</h2>}
        {error && <div className={styles.error}>{error.message}</div>}
        <UiFileInputButton
          label="Select files..."
          uploadFileName="theFiles"
          allowMultipleFiles={true}
          onChange={onChange}
        />
      </div>
      <div className={styles.slideshow}>
        { images.length ? 
          <>
            <button className={styles.next} onClick={()=> swiper && swiper.slideNext()}>NEXT</button>
            <button className={styles.prev} onClick={()=> swiper && swiper.slidePrev()}>PREV</button>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              pagination={{clickable:true}}
              onSwiper={(s)=>setSwiper(s)}
            >
              {images.map(({url}, idx) => 
                <SwiperSlide key={idx}>
                  <div className={styles.slide}>
                    <img className={styles.slideImage} src={`${url}?w=600`}/>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </>
        :
          <div className={styles.slideshow}>No images uplaoded...</div>
        }
      </div>
    </div>
  )
}

const UiFileInputButton = ({allowMultipleFiles, acceptedFileTypes, uploadFileName, onChange, label}) => {
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const onClickHandler = () => {
    fileInputRef.current.click();
  };
  const onChangeHandler = (event) => {
    if (!event.target.files.length) {
      return;
    }
    const formData = new FormData();
    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    onChange(formData);
    formRef.current.reset();
  };

  return (
    <form ref={formRef}>
      <button type="button" onClick={onClickHandler}>
        {label}
      </button>
      <input
        accept={acceptedFileTypes}
        multiple={allowMultipleFiles}
        name={uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </form>
  );
};