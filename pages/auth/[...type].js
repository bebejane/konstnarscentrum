import Auth from "/components/auth";
import { roleController, applicationController } from "/controllers";
import { getCsrfToken } from "next-auth/react";

const pages = [
	{ id: "apply" },
	{ id: "signup" },
	{ id: "signin" },
	{ id: "reset" },
	{ id: "signout" },
];

export default Auth;

export async function getServerSideProps(context) {
	
  const type = context.query.type ? context.query.type[0] : null;	
	const token = context.query.token || null;
	const csrfToken = await getCsrfToken(context);

	if(!pages.filter(p => p.id === type).length) return { notFound:true }
	
	const props = {
		type,
		token,
		csrfToken
	}

	if(['apply', 'signup'].includes(type))
		props.roles =  await roleController.all()
	if(type === 'signup' && token)
		props.application =  await applicationController.getByToken(token);

	return {props}
}
