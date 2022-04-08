import { Dato } from "/lib/dato/api";

export default {
  all: async () => {
		const roles = (await Dato.roles.all()).filter(r => r.environmentsAccess !== 'all')
		return roles;
	},
	get: async (id) => {
		const role = await Dato.roles.find(id)
		return role;
	}
}