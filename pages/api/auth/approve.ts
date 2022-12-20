import { NextApiResponse, NextApiRequest } from 'next';
import { withBasicAuth } from 'dato-nextjs-utils/hoc'
import NextCors from 'nextjs-cors';
import Email from '/lib/emails';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	await NextCors(req, res, {
		methods: ['POST'],
		origin: '*',
		optionsSuccessStatus: 200,
	});

	withBasicAuth(async (req, res) => {
		try {

			const { email, approval_token, first_name, last_name, approved } = req.body;

			console.log('approve application', email);

			if (!email || !approval_token || !first_name || !last_name)
				throw 'Ogitltig data'

			if (approved) {
				await Email.applicationApproved({ email, token: approval_token, name: `${first_name} ${last_name}` });
			} else {
				console.log('already approved')
			}

			res.status(200).json({ approved });

		} catch (err) {
			console.error(err);
			res.status(501).json({ error: err?.message || err });
		}
	})
}