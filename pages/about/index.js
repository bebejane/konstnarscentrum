import styles from "./About.module.scss";
import { aboutController } from "/controllers";
import { StructuredText, Image } from "react-datocms";


export default function About({ about }) {
	console.log(about)
	return (
		<div className={styles.container}>
			<h1>About</h1>
			<StructuredText 
				data={about.content} 
				renderBlock={({ record }) => {
					console.log(record)
          switch (record.__typename) {
            case 'ImageRecord':
              return <Image data={record.image.responsiveImage} />;
            default:
              return null;
          }
        }}
			/>
		</div>
	);
}

export async function getServerSideProps(context) {
	const about = await aboutController.get();
	return {
		props: {
			about
		},
	};
}
