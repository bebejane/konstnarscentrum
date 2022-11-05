import nodemailer from 'nodemailer'
import mjml2html from 'mjml'

const allowed = [process.env.SENDGRID_FROM_EMAIL, 'bjornthief@gmail.com', 'mattias@konst-teknik.se', 'bjorn@konst-teknik.se', 'bebejanedev@gmail.com']
const transporter = nodemailer.createTransport({
  //@ts-ignore
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
})

type SendProps = {
  email: string,
  subject: string,
  text: string,
  html?: string
}

const send = async ({ email, subject, text, html }: SendProps) => {

  const message = {
    from: `"${process.env.SMTP_FROM_NAME}" ${process.env.SMTP_EMAIL}`,
    to: allowed.includes(email) ? email : process.env.SMTP_EMAIL,
    subject,
    text,
    html
  }
  console.log('send email', email)
  const info = await transporter.sendMail(message);
  return info;
}

const createHtml = (body : string) =>{
  return mjml2html(`
    <mjml>
      <mj-body>
        ${body}
      </mj-body>
    </mjml>
  `).html
}

const Email = {
  resetPassword: ({ email, token }: { email: string, token: string}) => {
    const message = 'Click the link to reset your password'
    const link = `${process.env.NEXTAUTH_URL}/auth?type=reset&token=${token}`
  
    return send({
      email,
      subject: 'Reset your password',
      text: `${message}\n${link}`,
      html: createHtml(`
        <mj-section>
          <mj-column>
            <mj-text align="center">
              ${message}
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
            <mj-button href="${link}" font-family="Helvetica" background-color="#000000" color="#ffffff">
              Reset password
            </mj-button>
          </mj-column>
        </mj-section>
      `)
    })
  },
  applicationSubmitted: ({ email }: { email: string }) => {
    const message = 'Your application has been sent and is being reviewed'
    return send({
      email,
      subject: 'Thanks for your application',
      text: `${message}`,
      html: createHtml(`
        <mj-section>
          <mj-column>
            <mj-text align="center">
              ${message}
            </mj-text>
          </mj-column>
        </mj-section>
      `)
    })
  },
  applicationApproved: ({ email, token }: { email: string, token:string }) => {
    const link = `${process.env.NEXTAUTH_URL}/auth?type=signup&token=${token}`
    const message = `Please signup here\n${link}`
    return send({
      email,
      subject: 'You application have been approved',
      text: `${message}`,
      html: createHtml(`
        <mj-section>
          <mj-column>
            <mj-text align="center">
              ${message}
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
            <mj-button href="${link}" font-family="Helvetica" background-color="#000000" color="#ffffff">
              Sign up
            </mj-button>
          </mj-column>
        </mj-section>
      `)
    })
  }
}

export default Email;