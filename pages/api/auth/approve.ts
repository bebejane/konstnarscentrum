import { catchErrorsFrom } from '/lib/utils'
import Email from '/emails';

export default catchErrorsFrom(async (req, res) => {
	const { entity, previous_entity } = req.body;
	const approved = entity && previous_entity && (entity.attributes.approved && !previous_entity.attributes.approved);
	if (approved) {
		const { email, approval_token: token, first_name: name } = entity.attributes
		await Email.applicationApproved({email, token, name});
	} else {
		console.log('no approval')
	}
	res.status(200).json({ approved });
})