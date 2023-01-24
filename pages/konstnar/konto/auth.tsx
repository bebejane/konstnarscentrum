import Auth from "/components/account";
import { getCsrfToken, getProviders } from "next-auth/react";
import { applicationController } from "/lib/controllers";
import { regions } from "/lib/region";

const types = [{ id: "apply" }, { id: "signup" }, { id: "signin" }, { id: "reset" }, { id: "signout" }, { id: "error" }];

export async function getServerSideProps(context) {

	const authType = context.query.type;

	if (!types.find(p => p.id === authType))
		return { notFound: true }

	const { type, token, error } = context.query;

	const res = await Promise.all([getCsrfToken(context), getProviders()]);
	const csrfToken = res[0]
	const providers = res[1]
	const application = type === 'signup' && token ? await applicationController.getByToken(token) : undefined

	const props = {
		type,
		token,
		csrfToken,
		error,
		regions,
		providers,
		application
	};

	Object.keys(props).forEach(k => props[k] === undefined && delete props[k]) // Remove undefined props

	return { props }
}

export const config = {
	//runtime: 'experimental-edge'
}

export default Auth;