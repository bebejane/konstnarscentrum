import Home from "/components/pages/Home";
import { frontPageController } from "/controllers";

export default Home;

export async function getStaticProps() {
	const frontPage  = await frontPageController.get();	
	return {
		props: {
			...frontPage,
		},
		revalidate:30
	}
}