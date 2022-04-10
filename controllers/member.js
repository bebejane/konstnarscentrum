import Dato, { apiQuery } from "/lib/dato/api";
import { GetAllMembers, GetMember, GetMemberByPasswordToken } from "/graphql/member.graphql";

export default {
  all: async (preview) => {
		const {members} = await apiQuery(GetAllMembers, {}, preview);
		return members
	},
	get: async (email, preview) => {
		const {member} = await apiQuery(GetMember, {email}, preview);
		return member
	},
	getByPasswordToken: async (token, preview) => {
		const {member} = await apiQuery(GetMemberByPasswordToken, {token}, preview);
		return member
	},
	exists: async (email, preview) => {
		const {member} = await apiQuery(GetMember, {email}, preview);
		return member ? true : false
	},
};