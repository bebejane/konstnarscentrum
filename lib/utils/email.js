import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport';

const fromEmail = 'bebe@purplepurples.net';
const fromName = 'Konst Centrum'
const allowed = ['bjornthief@gmail.com', 'mattias@konst-teknik.se']

const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
}));

const send = async (options, template) => {

  const message = {
    from: `"${fromName}" ${fromEmail}`,
    to: allowed.includes(options.to) ? options.to : `bjornthief@gmail.com`, //options.to,
    subject: options.subject,
    text: options.message
  }
  console.log('send email', message)
  const info = await transporter.sendMail(message);
  return info;
}

const sendApprovalEmail = async (email, token) => {
  return send({
    to:`${email}`,
    subject:'You have been approved',
    message: `Please signup here ${process.env.NEXTAUTH_URL}/auth/signup?token=${token}`
  })
}
const sendApplicationEmail = async (email) => {
  return send({
    to:`${email}`,
    subject:'Application sent',
    message: `Your application has been sent and is being reviewed`
  })
}
const sendResetPasswordEmail = async (email, token) => {
  return send({
    to:`${email}`,
    subject:'Reset your account',
    message: `Reset your account password here ${process.env.NEXTAUTH_URL}/auth/reset?token=${token}`

  })
}
export default {
  send,
  sendApprovalEmail,
  sendApplicationEmail,
  sendResetPasswordEmail
}



