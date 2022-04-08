import districts from '/districts.json'
import Auth from "/lib/auth/components";
import { getCsrfToken } from "next-auth/react";
import { applicationController } from "/controllers";

const types = [{ id: "apply" }, { id: "signup" }, { id: "signin" }, { id: "reset" }, { id: "signout" }, { id: "error" }];

export async function getServerSideProps(context) {
  const { type, token, error } = context.query;	
	const csrfToken = await getCsrfToken(context);
	
	if(!types.filter(p => p.id === type).length) 
		return { notFound:true }
	
	const props = { type, token, csrfToken, error, districts };

	if(type === 'signup' && token)
		props.application =  await applicationController.getByToken(token);
	
	Object.keys(props).forEach(k => props[k] === undefined && delete props[k])

	return { props }
}

export default Auth;