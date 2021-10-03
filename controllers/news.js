import { apiQuery } from "/lib/dato";
import { GetAllNews, GetNews } from "/graphql/News.graphql";
import Dato from "lib/dato";

export default {
	all: async (preview) => {
		const { news } = await apiQuery(GetAllNews, {}, preview);
		return news
	},
};
