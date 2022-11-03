const validateSignUp = (params) => {
	const {email, password, password2, firstName, lastName} = params
	const errors = [];

	const emailError = validateEmail(email);
	const passwordError = validatePassword(password, password2);

	if (emailError) 
		errors.push(emailError);
	if (passwordError) 
		errors.push(passwordError);
	if (!firstName) 
		errors.push('Invalid first name');
	if (!lastName) 
		errors.push('Invalid last name');
		
	if (errors.length) 
		throw new Error(errors.join(', '));

	return params;
};
const validatePassword = (password, password2) => {
	if (!password) 
		return 'Password is empty'
	else if (password2 !== undefined && password !== password2)
		return 'Password does not match';
	else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
		return 'Password format is invalid'
	else return null;
};
const validateEmail = (email) => {
	if (!email) 
    return 'E-mail is empty'
	else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) 
    return 'E-mail is invalid'
	else return null;
};
export {
	validateSignUp,
	validateEmail,
	validatePassword
}
