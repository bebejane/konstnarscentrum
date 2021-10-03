import Dato from "/lib/dato";

export default {
  all: async () => {
		const applications = await Dato.items.all()
		return applications;
	},
	get: async (id) => {
    const application = await Dato.items.get(id)
		return application;
	},
  getByToken: async (token) => {
    const applications = await Dato.items.all({filter: {type: "application", fields: {approvalToken: {eq: token }}}})
		return applications.length === 1 ? applications[0] : null;
	}
}