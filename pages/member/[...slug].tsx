import { requireAuthentication } from '/lib/auth'
import Member from '.'

export default Member;

export const getServerSideProps = requireAuthentication((context, session) => {
  return { props: { session } };
})

export const config = {
	runtime:'experimental-edge'
}