import News from "/components/pages/news/News";
import { requireAuthentication } from "/lib/auth";
import { newsController } from "/controllers";

export default News;

export async function getServerSideProps(context){
	const news = await newsController.all();
	return { 
		props: { 
			news 
		}
	};
};
