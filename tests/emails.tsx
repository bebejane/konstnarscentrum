import { Email } from "../lib/emails";

const defaultInvitation = {
  email: 'bjorn@konst-teknik.se',
  token: 'lsjdlakjsalkdjsjdkjsakldajs',
  name: 'Björn Berglund'
}

console.log('Email.memberInvitation')
console.log(defaultInvitation);
console.time('dur')

Email.memberInvitation(defaultInvitation).then(res => {
  console.log('done')
}).catch((err) => {
  console.error(err)
}).finally(() => {
  console.timeEnd('dur')
})