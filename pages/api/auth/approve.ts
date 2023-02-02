import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { Email } from "/lib/emails";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	await NextCors(req, res, { methods: ['POST'], origin: '*', optionsSuccessStatus: 200 });

	try {

		const basicAuth = req.headers.authorization

		if (!basicAuth)
			return res.status(401).json({ error: 'Access denied' })

		const auth = basicAuth.split(' ')[1]
		const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')
		const isAuthorized = user === process.env.BASIC_AUTH_USER && pwd === process.env.BASIC_AUTH_PASSWORD

		if (!isAuthorized)
			return res.status(401).send('Access denied')

		const { email, approval_token, first_name, last_name, approved } = req.body;

		console.log('approve application', email);

		if (!email || !approval_token || !first_name || !last_name)
			throw 'Ogitltig data'

		if (approved)
			await Email.applicationApproved({ email, token: approval_token, name: `${first_name} ${last_name}` });
		else
			console.log('already approved')

		res.status(200).json({ approved });

	} catch (err) {
		console.error(err);
		res.status(501).json({ error: err?.message || err });
	}

}

/*
export default async function handler(req: NextRequest, res: NextResponse) {

	//await NextCors(req, res, { methods: ['POST'], origin: '*', optionsSuccessStatus: 200 });



	try {

		const basicAuth = req.headers.get('authorization')

		if (!basicAuth) {
			console.log('Unauthorzied');
			return new Response('Unauthorized', { status: 401 })
		}

		const auth = basicAuth.split(' ')[1]
		const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')
		const isAuthorized = user === process.env.BASIC_AUTH_USER && pwd === process.env.BASIC_AUTH_PASSWORD

		if (!isAuthorized) {
			console.log('Unauthorzied');
			return new Response('Unauthorized', { status: 401 })
		}

		const { email, approval_token, first_name, last_name, approved } = await req.json();

		console.log('approve application', email);

		if (!email || !approval_token || !first_name || !last_name)
			throw 'Ogitltig data'

		if (approved) {
			console.log('send email');
			await Email.applicationApproved({ email, token: approval_token, name: `${first_name} ${last_name}` });
		}
		else
			console.log('already approved')

		return new Response(JSON.stringify({ approved }), {
			status: 200,
			headers: { 'content-type': 'application/json' }
		})

	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: err }), {
			status: 500,
			headers: { 'content-type': 'application/json' }
		})
	}

}

export const config = {
	runtime: 'edge'
}
*/