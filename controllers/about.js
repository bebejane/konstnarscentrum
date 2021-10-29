import { apiQuery } from "/lib/dato";
import { GetAbout } from "/graphql/About.graphql";

export default {
	get: async (preview) => {
		const { about } = await apiQuery(GetAbout, {}, preview);
		return about
	},
};
