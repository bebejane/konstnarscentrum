import { apiQuery } from "dato-nextjs-utils/api";
import { AllNewsDocument } from "/graphql";

const newsController =  {
	all: async () => {
		const { news } = await apiQuery(AllNewsDocument);
		return news
	},
}

export default newsController;
