import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport';

const allowed = [process.env.SENDGRID_FROM_EMAIL, 'bjornthief@gmail.com', 'mattias@konst-teknik.se', 'bjorn@konst-teknik.se', 'bebejanedev@gmail.com']
const transporter = nodemailer.createTransport(sgTransport({auth: {api_key: process.env.SENDGRID_API_KEY}}));

const send = async (options, template) => {

  const message = {
    from: `"${process.env.SENDGRID_FROM_NAME}" ${process.env.SENDGRID_FROM_EMAIL}`,
    to: allowed.includes(options.to) ? options.to : process.env.SENDGRID_FROM_EMAIL,
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
    message: `Please signup here ${process.env.NEXTAUTH_URL}/auth?type=signup&token=${token}`
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
    message: `Reset your account password here ${process.env.NEXTAUTH_URL}/auth?type=reset&token=${token}`

  })
}
export default {
  send,
  sendApprovalEmail,
  sendApplicationEmail,
  sendResetPasswordEmail
}



