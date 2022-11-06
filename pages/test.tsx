//import styles from "./index.module.scss";
import { GetStaticProps } from "next";
import withGlobalProps from "/lib/withGlobalProps";
import { AllAboutsDocument } from "/graphql";

type AboutsProps = {
	content: AboutRecord[]
}

export default function Test({ content } : AboutsProps) {
	
	return (
		<div>
			test
		</div>
	);
}


export const getStaticProps : GetStaticProps = withGlobalProps({queries:[AllAboutsDocument]}, async ({props, revalidate, context } : any) => {
	
	return {
		props,
		revalidate
	};
});


export const config = {
	runtime:'experimental-edge'
}