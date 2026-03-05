import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';

import {
	Mjml,
	MjmlBody,
	MjmlSection,
	MjmlColumn,
	MjmlText,
	MjmlSpacer,
	MjmlDivider,
} from 'mjml-react';

import { leadingTight, leadingRelaxed, textBase, textXl } from './components/theme';

const ContactFormConfirmation: React.FC<{ name: string; text: string }> = ({ name, text }) => (
	<Mjml>
		<Head />
		<MjmlBody width={600}>
			<Header loose />
			<MjmlSection padding='0 24px' cssClass='smooth'>
				<MjmlColumn>
					<MjmlDivider borderColor='#666' borderWidth='1px' padding='0 0 40px 0'></MjmlDivider>
					<MjmlText cssClass='paragraph' padding='0' fontSize={textXl} lineHeight={leadingTight}>
						Hej {name},
					</MjmlText>
					<MjmlText
						padding='24px 0 0'
						fontSize={textBase}
						lineHeight={leadingRelaxed}
						cssClass='paragraph'
					>
						{text}
					</MjmlText>
					<MjmlSpacer height='8px' />
					<MjmlDivider borderColor='#666' borderWidth='1px' padding='40px 0 0 0'></MjmlDivider>
				</MjmlColumn>
			</MjmlSection>
			<Footer />
		</MjmlBody>
	</Mjml>
);

export default ContactFormConfirmation;
