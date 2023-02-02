import client from '/lib/client'

const applicationController = {
	all: async () => {
		const applications = await client.items.list({ filter: { type: 'application' } })
		return applications;
	},
	get: async (id: string) => {
		const application = await client.items.list({ filter: { type: 'application', id: { eq: id } } })
		return application;
	},
	exists: async (email: string) => {
		const application = await client.items.list({ filter: { type: 'application', fields: { email: { eq: email } } } })
		console.log(email)
		return application.length > 0;
	},
	getByToken: async (token: string) => {
		const applications = await client.items.list({ filter: { type: "application", fields: { approval_token: { eq: token } } } })
		return applications.length === 1 ? applications[0] : null;
	}
}

export default applicationController;