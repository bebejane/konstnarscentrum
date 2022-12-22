import { Email } from "/lib/emails";

export default async function handler(req: NextRequest, res: NextResponse) {

  const { fromEmail, fromName, fields, to, subject } = req.body
  console.log({ fromEmail, fromName, fields, to, subject });

  try {
    await Email.contactForm({ fromEmail, fromName, fields, to, subject })
    res.json({ success: true })
  } catch (err) {
    res.json({ success: false, error: err.message })
  }
}

