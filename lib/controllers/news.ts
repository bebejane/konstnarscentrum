import { apiQuery } from "dato-nextjs-utils/api";
import { GetAllNews, GetNews } from "/lib/graphql/news.gql";

const newsController =  {
	all: async () => {
		const { news } = await apiQuery(GetAllNews);
		return news
	},
}

export default newsController;
