//import styles from "./index.module.scss";
import { GetStaticProps } from "next";
import withGlobalProps from "/lib/withGlobalProps";
import { AllAboutsDocument } from "/graphql";

type AboutsProps = {
	abouts: AboutRecord[]
}

export default function Abouts({ abouts } : AboutsProps) {
	
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