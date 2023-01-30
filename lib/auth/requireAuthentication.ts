import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth";

export default function requireAuthentication(getServerSideProps) {
	return async (context) => {
		const session = await getServerSession(context.req, context.res, authOptions);
		if (!session) {
			return {
				props: {},
				redirect: { destination: `${process.env.NEXTAUTH_URL}/konstnar/konto/logga-in`, permanent: false }
			};
		}
		// Passed auth, call page getServerSideProps
		return await getServerSideProps(context, session); // Continue on to call `getServerSideProps` logic
	};
};
