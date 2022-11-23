import styles from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllCommissionsDocument, CommissionDocument } from "/graphql";
import Link from "next/link";

export type Props = {
	commissions: CommissionRecord[]
}

export default function DistrictHome({ commissions }: Props) {

	return (
		<div className={styles.container}>
			{commissions.map(({ title, slug }, idx) =>
				<Link key={idx} href={`/anlita-oss/uppdrag/${slug}`}>
					{title}
				</Link>
			)}
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllCommissionsDocument] }, async ({ props, revalidate, context }: any) => {

	return {
		props,
		revalidate
	};
});
