import { apiQuery } from "dato-nextjs-utils/api";
import { AllMembersDocument, MemberDocument, MemberByPasswordTokenDocument } from "/graphql";

const memberController =  {
  all: async () => {
		const {members} = await apiQuery(AllMembersDocument);
		return members
	},
	get: async (email) => {
		const {member} = await apiQuery(MemberDocument);
		return member
	},
	getByPasswordToken: async (token : string) => {
		const {member} = await apiQuery(MemberByPasswordTokenDocument, {variables:{token}});
		return member
	},
	exists: async (email : string) => {
		const {member} = await apiQuery(MemberDocument, {variables:{email}});
		return member ? true : false
	},
};

export default memberController