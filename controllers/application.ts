import client from '/lib/client'

export default {
  all: async () => {
		const applications = await client.items.list({filter:{type:'application'}})
		return applications;
	},
	get: async (id) => {
    const application = await client.items.list({filter:{type:'application', id:{eq:id}}})
		return application;
	},
	exists: async (email) => {
    const application = await client.items.list({filter:{type:'application', fields:{email:{eq:email}}}})
		console.log(email)
		return application.length > 0;
	},
  getByToken: async (token) => {
    const applications = await client.items.list({filter: {type: "application", fields: {approvalToken: {eq: token }}}})
		return applications.length === 1 ? applications[0] : null;
	}
}