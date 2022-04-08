import { apiQuery } from "/lib/dato/api";
import { GetAllNews, GetNews } from "/graphql/News.graphql";

export default {
	all: async (preview) => {
		const { news } = await apiQuery(GetAllNews, {}, preview);
		return news
	},
};
