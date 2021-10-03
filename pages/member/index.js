import Member from "/components/pages/member/Member";
import { requireAuthentication } from "/lib/auth";
import { newsController } from "/controllers";

export default Member;

export const getServerSideProps = requireAuthentication( async (context, session) => {
	const news = await newsController.all();
	return { 
		props: { 
			session, 
			news 
		}
	};
});
