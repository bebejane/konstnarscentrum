import axios from "axios";

const signUp = async ({ email, password, password2, firstName, lastName, roleId }) => {
	let res = await axios.post("/api/auth/signup", {
		email,
		password,
		password2,
		firstName,
		lastName,
		roleId,
	});
	return res.data;
};
const apply = async ({
	email,
	firstName,
	lastName,
	message,
	education,
	webpage,
	regionId,
	pdf,
}) => {
	let res = await axios.post("/api/auth/apply", {
		email,
		firstName,
		education,
		webpage,
		lastName,
		message,
		regionId,
		pdf,
	});
	return res.data;
};

const reset = async ({ email, token, password, password2 }) => {
	let res = await axios.post("/api/auth/reset", { email, token, password, password2 });
	return res.data;
};

export default {
	signUp,
	apply,
	reset,
};
