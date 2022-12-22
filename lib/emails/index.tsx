import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";
import ResetPassword from './ResetPassword'
import ApplicationSubmitted from './ApplicationSubmitted'
import ApplicationApproved from './ApplicationApproved'
import ContactForm from "./ContactForm";

const transport = nodemailer.createTransport({
  pool: true,
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "dev@konst-teknik.se",
  configPath: "./mailing.config.json",
});

export const isValidUrl = (str: string): boolean => {
  if (!str) return false
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
}

export const Email = {
  resetPassword: ({ email, token }: { email: string, token: string }) =>
    sendMail({
      to: email,
      subject: 'Reset your password',
      component:
        <ResetPassword
          link={`${process.env.NEXTAUTH_URL}/auth?type=reset&token=${token}`}
          ctaText={'Reset password'}
          body={
            <>
              We&apos;ve received your request to change your password.
              Use the link below to set up a new password for your account.
            </>
          }
        />
    })
  ,
  applicationSubmitted: ({ email, name }: { email: string, name: string }) =>
    sendMail({
      to: email,
      subject: 'Thanks for your application',
      component: <ApplicationSubmitted name={name} />
    })
  ,
  applicationApproved: ({ email, name, token }: { email: string, name: string, token: string }) =>
    sendMail({
      to: email,
      subject: 'Your application have been approved!',
      component:
        <ApplicationApproved
          name={name}
          link={`${process.env.NEXTAUTH_URL}/auth?type=signup&token=${token}`}
        />
    }),
  contactForm: ({ fromName, fromEmail, to, subject, fields }: {
    fromName: string,
    fromEmail: string,
    to: string,
    subject: string,
    fields: { title: string, value: string }[],
  }) =>
    sendMail({
      to,
      subject,
      component:
        <ContactForm
          fromName={fromName}
          fromEmail={fromEmail}
          subject={subject}
          fields={fields}
        />
    })
}


export default sendMail;
