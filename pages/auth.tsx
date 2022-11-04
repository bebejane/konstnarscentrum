import Auth from "/components/auth";
import { getCsrfToken } from "next-auth/react";
import { getProviders } from "next-auth/react"
import { applicationController } from "/lib/controllers";
import { districts } from "/lib/district";

const types = [{ id: "apply" }, { id: "signup" }, { id: "signin" }, { id: "reset" }, { id: "signout" }, { id: "error" }];

export async function getServerSideProps(context) {
	
	const authType = context.query.type;
	
	if(!types.find(p => p.id === authType)) 
		return { notFound:true }

  const { type, token, error } = context.query;	
	const res = Promise.all([getCsrfToken(context), getProviders()]);
	const csrfToken = res[0]
	const providers = res[1]
	const props = { type, token, csrfToken, error, districts, providers, application:undefined };
	console.log(providers);
	
	if(type === 'signup' && token) 
		props.application =  await applicationController.getByToken(token);
	
	Object.keys(props).forEach(k => props[k] === undefined && delete props[k]) // Remove undefined props

	return { props }
}

export const config = {
	runtime:'experimental-edge'
}

export default Auth;