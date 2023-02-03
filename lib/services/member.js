import axios from "axios";

const signUp = async ({ email, password, password2, firstName, lastName, regionId }) => {
	let res = await axios.post("/api/auth/signup", {
		email,
		password,
		password2,
		firstName,
		lastName,
		regionId,
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

const reset = async ({ token, password, password2 }) => {
	let res = await axios.post("/api/auth/reset", { token, password, password2 });
	return res.data;
};

export default {
	signUp,
	apply,
	reset,
};
