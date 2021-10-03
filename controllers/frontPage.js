import { apiQuery } from "/lib/dato";
import { GetFrontPage } from "/graphql/FrontPage.graphql";
import Dato from "lib/dato";

export default {
	get: async (preview) => {
		const {frontPage} = await apiQuery(GetFrontPage, {}, preview);
		return frontPage
	},
};
