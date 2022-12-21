import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlImage,
  MjmlSpacer,
} from "mjml-react";

import {
  leadingTight,
  leadingRelaxed,
  textBase,
  textXl,
} from "./components/theme";

const ContactForm: React.FC<{
  subject: string,
  fromName: string,
  fromEmail: string,
  fields: { title: string, value: string }[],
}> = ({ subject, fromName, fromEmail, fields }) => (
  <Mjml>
    <Head />
    <MjmlBody width={600}>
      <Header loose />
      <MjmlSection padding="0 24px" cssClass="smooth">
        <MjmlColumn>
          <MjmlText
            cssClass="paragraph"
            padding="0"
            fontSize={textXl}
            lineHeight={leadingTight}
          >
            {subject}
          </MjmlText>
          <MjmlText
            padding="24px 0 0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            Från: {fromName} {fromEmail}
          </MjmlText>
          <MjmlText
            padding="24px 0 0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            {fields.map(({ title, value }, idx) =>
              <p key={idx}>
                {title}<br />
                {value}
              </p>
            )}
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </MjmlBody>
  </Mjml>
);

export default ContactForm
