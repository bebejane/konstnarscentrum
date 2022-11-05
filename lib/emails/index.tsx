import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";
import ResetPassword from './ResetPassword'
import ApplicationSubmitted from './ApplicationSubmitted'
import ApplicationApproved from './ApplicationApproved'


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

const Email = {
  resetPassword: ({ email, token }: { email: string, token: string}) => 
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
  applicationSubmitted: ({ email, name }: { email: string, name:string }) => 
    sendMail({
      to: email,
      subject: 'Thanks for your application',
      component: <ApplicationSubmitted name={name}/>
    })
  ,
  applicationApproved: ({ email, name, token } : { email: string, name:string, token:string }) => 
    sendMail({
      to:email,
      subject: 'Your application have been approved!',
      component: 
        <ApplicationApproved 
          name={name} 
          link={`${process.env.NEXTAUTH_URL}/auth?type=signup&token=${token}`}
        />
    })
}


export default Email;
