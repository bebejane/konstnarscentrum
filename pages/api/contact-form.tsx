import { Email } from "/lib/emails";
import { isEmail } from "/lib/utils";
import { MemberNewsByIdDocument } from "/graphql";
import { apiQuery } from "dato-nextjs-utils/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {

    const errors = []
    const { fromEmail, fromName, fields, recordId } = req.body
    console.log(req.body);

    const { memberNews }: { memberNews: MemberNewsRecord } = await apiQuery(MemberNewsByIdDocument, { variables: { id: recordId } })
    console.log(memberNews);

    if (!memberNews)
      throw new Error(`Post kunde inte hittas med id: ${id}`)

    const form = memberNews.content.blocks.find(({ __typename }) => __typename === 'FormRecord') as FormRecord

    if (!form)
      throw new Error(`Formulär kunde inte hittas med id: ${id}`)

    if (!fromEmail || !isEmail(fromEmail))
      errors.push('E-post adress är ogiltig')
    if (!fromName || !isEmail(fromEmail))
      errors.push('Namn är ogiltig')
    if (!fields)
      errors.push('Det finns inga fält inlaggda')
    else
      fields.forEach(({ title, value }) => !value && errors.push(`Fält "${title}" är tomt`))

    if (errors.length)
      throw new Error(errors.join('. '))

    await Email.contactForm({ fromEmail, fromName, fields, to: form.reciever, subject: form.subject })
    res.json({ success: true })
  } catch (err) {
    res.json({ success: false, error: err.message })
  }
}

