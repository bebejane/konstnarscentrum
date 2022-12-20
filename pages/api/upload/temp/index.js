import styles from "./Upload.module.scss";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { KCImage as Image } from "/components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Upload(data) {
	const [uploadProgress, setUploadProgress] = useState({
		status: "idle",
		totalProgress: 0,
		item: 0,
		percent: 0,
	});
	const [progress, setProgress] = useState({
		status: "idle",
		totalProgress: 0,
		item: 0,
		percent: 0,
		total: 0,
		images: [],
	});
	const [error, setError] = useState();
	const [swiper, setSwiper] = useState();

	const onChange = async (formData) => {
		setProgress({ status: "uploading", totalProgress: 0, item: 0, percent: 0, images: [] });
		try {
			const response = await axios.post("/api/upload", formData, {
				headers: { "content-type": "multipart/form-data" },
				responseType: "stream",
				onUploadProgress: (event) =>
					setUploadProgress({
						...progress,
						status: "uploading",
						totalProgress: Math.round((event.loaded * 100) / event.total),
					}),
				onDownloadProgress: (progressEvent) => {
					if (!progressEvent.currentTarget.response) return;
					try {
						const chunks = progressEvent.currentTarget.response
							.split("###")
							.filter((o) => o)
							.map((o) => JSON.parse(o));
						const p = chunks[chunks.length - 1];
						if (p && p.status) setProgress({ ...progress, ...p });
						else if (p && p.error) {
							setError(p.error);
						}
					} catch (err) {
						console.log(progressEvent.currentTarget.response);
						console.log(err);
					}
				},
			});
			console.log("done");
		} catch (err) {
			setError(err);
		}
	};
	const handleSwiper = (swiper) => {
		console.log(swiper);
	};
	const { images } = progress;

	return (
		<div className={styles.container}>
			<div className={styles.progress}>
				<div className={styles.header}>
					<div>
						<h2>Upload</h2>
					</div>
				</div>
				<h2>Uploading</h2>
				<progress value={uploadProgress.totalProgress} max={100} />
				<div className={styles.status}>
					Status: {uploadProgress.status} {uploadProgress.totalProgress}%
				</div>

				<h2>Processing</h2>
				<progress value={progress.totalProgress} max={100} />
				<div className={styles.status}>
					Status: {progress.status} {progress.item}/{progress.total} ({progress.percent}%)
				</div>
				{progress.status === "done" && <h2>Done!</h2>}
				{error && <div className={styles.error}>{error.message}</div>}
				<UiFileInputButton
					label="Select files..."
					uploadFileName="theFiles"
					allowMultipleFiles={true}
					onChange={onChange}
				/>
			</div>
			<div className={styles.slideshow}>
				{images.length ? (
					<>
						<button className={styles.next} onClick={() => swiper && swiper.slideNext()}>
							NEXT
						</button>
						<button className={styles.prev} onClick={() => swiper && swiper.slidePrev()}>
							PREV
						</button>
						<Swiper
							spaceBetween={50}
							slidesPerView={1}
							pagination={{ clickable: true }}
							onSwiper={(s) => setSwiper(s)}
						>
							{images.map(({ url }, idx) => (
								<SwiperSlide key={idx}>
									<div className={styles.slide}>
										<img className={styles.slideImage} src={`${url}?w=600`} />
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</>
				) : (
					<div className={styles.slideshow}>No images uplaoded...</div>
				)}
			</div>
		</div>
	);
}

const UiFileInputButton = ({
	allowMultipleFiles,
	acceptedFileTypes,
	uploadFileName,
	onChange,
	label,
}) => {
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
				style={{ display: "none" }}
				type="file"
			/>
		</form>
	);
};
