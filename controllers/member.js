import Dato, { apiQuery } from "/lib/dato";
import { GetAllMembers, GetMember } from "/graphql/Member.graphql";

export default {
  all: async (preview) => {
		const {members} = await apiQuery(GetAllMembers, {}, preview);
		return members
	},
	get: async (email, preview) => {
		const {member} = await apiQuery(GetMember, {email}, preview);
		return member
	},
	exists: async (email, preview) => {
		const {member} = await apiQuery(GetMember, {email}, preview);
		return member ? true : false
	},
};