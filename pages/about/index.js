import styles from "./About.module.scss";
import { aboutController } from "/controllers";
import { StructuredText, Image } from "react-datocms";


export default function About({ about, abouts }) {
	console.log(abouts)
	return (
		<div className={styles.container}>
			{abouts.map((about)=>
				<>
				<h1>{about.title}</h1>
				<StructuredText 
					data={about.content} 
					renderBlock={({ record }) => {
						console.log(record)
						switch (record.__typename) {
							case 'ImageRecord':
								return <Image data={record.image.responsiveImage} />;
							case 'HeadlineRecord':
								return <h2>{record.headline}</h2>;
							default:
								return null;
						}
					}}
				/>
				<hr/>
				</>
			)}
		</div>
	);
}

export async function getServerSideProps(context) {
	const about = await aboutController.get();
	const abouts = await aboutController.all();
	return {
		props: {
			about,
			abouts
		},
	};
}
