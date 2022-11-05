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

const ApplicationSubmitted: React.FC<{ name: string }> = ({ name }) => (
  <Mjml>
    <Head />
    <MjmlBody width={600}>
      <Header loose />
      <MjmlSection padding="0">
        <MjmlColumn>
          <MjmlImage
            cssClass="hero"
            padding="0 0 40px"
            align="left"
            src="https://s3.amazonaws.com/lab.campsh.com/bb-hero%402x.jpg"
          />
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection padding="0 24px" cssClass="smooth">
        <MjmlColumn>
          <MjmlText
            cssClass="paragraph"
            padding="0"
            fontSize={textXl}
            lineHeight={leadingTight}
          >
            {name}, tack för din ansökan!
          </MjmlText>
          <MjmlText
            padding="24px 0 0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            Thank you {name} for joining Konstnärscentrum! We’re excited to help you enjoy
            great meals without any begging, guessing, waiting or phone calls.
          </MjmlText>
          <MjmlSpacer height="24px" />
          <MjmlText
            padding="0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            Enjoy!
            <br />
            Konstnärscentrum
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </MjmlBody>
  </Mjml>
);

export default ApplicationSubmitted
