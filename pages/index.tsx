import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";

export default function Home(props) {
	return (
		<div className={styles.container}>
			Content
		</div>
	)
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});