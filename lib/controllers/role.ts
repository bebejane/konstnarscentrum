import client from '/lib/client';

const rolesController = {
  all: async () => {
		const roles = (await client.roles.list()).filter(r => r.environments_access !== 'all')
		return roles;
	},
	get: async (id) => {
		const role = await client.roles.find(id)
		return role;
	}
}

export default rolesController;