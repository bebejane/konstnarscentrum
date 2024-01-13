import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { Email } from "/lib/emails";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	await NextCors(req, res, { methods: ['POST', 'GET', 'HEAD', 'OPTIONS'], origin: '*', optionsSuccessStatus: 200 });

	try {

		const { email, approval_token, first_name, last_name, approved, ping } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

		if (ping) {
			console.log('ping endpoint')
			return res.status(200).json({ pong: true });
		}

		console.log('approve application', email);

		const basicAuth = req.headers.authorization

		if (!basicAuth) {
			console.error('Access denied: no headers')
			return res.status(401).json({ error: 'Access denied' })
		}

		const auth = basicAuth.split(' ')[1]
		const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')
		const isAuthorized = user === process.env.BASIC_AUTH_USER && pwd === process.env.BASIC_AUTH_PASSWORD

		if (!isAuthorized) {
			console.error('Access denied: wrong user/pass', process.env.BASIC_AUTH_USER, process.env.BASIC_AUTH_PASSWORD)
			return res.status(401).send('Access denied')
		}

		if (!email || !approval_token || !first_name || !last_name)
			throw 'Ogitltig data'

		await Email.applicationApproved({ email, token: approval_token, name: `${first_name} ${last_name}` });

		console.log('application successfully approved', email)
		res.status(200).json({ approved });

	} catch (err) {
		console.log(req.body)
		console.error(err);
		res.status(500).json({ error: err?.message || err });
	}
}
