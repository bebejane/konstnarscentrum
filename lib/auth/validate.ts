const validateSignUp = (params) => {
	const { email, password, password2, firstName, lastName } = params
	const errors = [];

	const emailError = validateEmail(email);
	const passwordError = validatePassword(password, password2);

	if (emailError)
		errors.push(emailError);
	if (passwordError)
		errors.push(passwordError);
	if (!firstName)
		errors.push('Ogiltigt förnamn');
	if (!lastName)
		errors.push('Ogiltigt andranamn');

	if (errors.length)
		throw new Error(errors.join(', '));

	return params;
};
const validatePassword = (password, password2) => {
	if (!password)
		return 'Lösenordet är tomt'
	else if (password2 !== undefined && password !== password2)
		return 'Lösenordet matchar ej';
	else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
		return 'Fel format på lösenordet'
	else return null;
};
const validateEmail = (email) => {
	if (!email)
		return 'E-post adress är tom'
	else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
		return 'E-post adress är ogiltig'
	else return null;
};
export {
	validateSignUp,
	validateEmail,
	validatePassword
}
