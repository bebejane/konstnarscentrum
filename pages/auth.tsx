import districts from '/districts.json'
import Auth from "../components/auth";
import { getCsrfToken } from "next-auth/react";
import { applicationController } from "/lib/controllers";

const types = [{ id: "apply" }, { id: "signup" }, { id: "signin" }, { id: "reset" }, { id: "signout" }, { id: "error" }];

export async function getServerSideProps(context) {
	const authType = context.query.type;

	if(!types.filter(p => p.id === authType).length) 
		return { notFound:true }

  const { type, token, error } = context.query;	
	const csrfToken = await getCsrfToken(context);
	const props = { type, token, csrfToken, error, districts, application:undefined };
	
	if(type === 'signup' && token) 
		props.application =  await applicationController.getByToken(token);
	
	Object.keys(props).forEach(k => props[k] === undefined && delete props[k]) // Remove undefined props

	return { props }
}

export default Auth;