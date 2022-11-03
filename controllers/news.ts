import { apiQuery } from "dato-nextjs-utils/api";
import { GetAllNews, GetNews } from "/graphql/news.gql";

export default {
	all: async (preview) => {
		const { news } = await apiQuery(GetAllNews, {}, preview);
		return news
	},
};
