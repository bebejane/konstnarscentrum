import { requireAuthentication } from '/lib/auth'
import Member from '/components/pages/member'

export default Member;

export const getServerSideProps = requireAuthentication((context, session) => {
  return { props: { session } };
})
