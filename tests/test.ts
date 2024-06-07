import * as dotenv from "dotenv";
import { buildClient } from "@datocms/cma-client-node";
import { generateToken, comparePassword } from "../lib/auth";
//import { validatePassword } from "../lib/auth";
dotenv.config({ path: "./.env" });

import passwordValidator from 'password-validator';

const validator = new passwordValidator();
validator.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits(1).has().not().spaces()

const validatePassword = (password: string, password2?: string) => {
	if (!password)
		return 'Lösenordet är tomt'
	else if (password2 !== undefined && password !== password2)
		return 'Lösenordet matchar ej';
	else if (!validator.validate(password))
		return 'Lösenordet måste minst innehålla 8 tecken, en versal, en gemen och en siffra'
	else return null;
};


(async () => {
	/*
	const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN_FULL });
	const models = await client.itemTypes.list();
	const tokens = await client.accessTokens.list();
	const applicationModelId = models.find((el) => el.api_key === "application").id;
	console.log(applicationModelId);
	console.timeEnd('dur');
	*/


})();


const passwords = ['BFw@&+2bHqcx]8v', 'Dapper66', 'dapper66']

passwords.forEach((password) => {
	console.log(password, validatePassword(password))
})
