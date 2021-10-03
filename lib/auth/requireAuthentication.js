import { getSession } from "next-auth/react"

export default function requireAuthentication(getServerSideProps){
	return async (context) => {
		const session = await getSession(context);
		if (!session) {
			return {
				props: {},
				redirect: { destination: "/auth/signin", permanent: false }
			};
		}
		// Passed auth, call page getServerSideProps
		return await getServerSideProps(context, session); // Continue on to call `getServerSideProps` logic
	};
};
