import { apiQuery } from "/lib/dato";
import { GetAbout, GetAllAbouts } from "/graphql/About.graphql";

export default {
	get: async (preview) => {
		const { about } = await apiQuery(GetAbout, {}, preview);
		return about
	},
	all: async (preview) => {
		const { abouts } = await apiQuery(GetAllAbouts, {}, preview);
		return abouts
	}
};
