import { apiQuery } from "/lib/dato/api";
import { GetFrontPage } from "/graphql/frontpage.graphql";

export default {
	get: async (preview) => {
		const {frontPage} = await apiQuery(GetFrontPage, {}, preview);
		return frontPage
	},
};
