import styles from "./index.module.scss";

export default function News({ news }) {
	
	return (
		<div className={styles.container}>
			<h1>About</h1>
		</div>
	);
}

export const config = {
	runtime:'experimental-edge'
}