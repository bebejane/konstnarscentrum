import { apiQuery } from "dato-nextjs-utils/api";
import { GetAllMembers, GetMember, GetMemberByPasswordToken } from "/lib/graphql/member.gql";

const memberController =  {
  all: async () => {
		const {members} = await apiQuery(GetAllMembers);
		return members
	},
	get: async (email) => {
		const {member} = await apiQuery(GetMember);
		return member
	},
	getByPasswordToken: async (token : string) => {
		const {member} = await apiQuery(GetMemberByPasswordToken, {variables:{token}});
		return member
	},
	exists: async (email : string) => {
		const {member} = await apiQuery(GetMember, {variables:{email}});
		return member ? true : false
	},
};

export default memberController