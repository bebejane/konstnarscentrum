import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ButtonPrimary from "./components/ButtonPrimary";

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

const MemberInvitation: React.FC<{ name: string, link: string }> = ({ name, link }) => (
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
            Hej {name}, du kan nu skapa din portfolio.
            För att starta behöver du först registera ditt konto med ett nytt lösenord.
          </MjmlText>
          <MjmlSpacer height="24px" />
          <ButtonPrimary link={link} uiText={'Skapa konto'} />
          <MjmlSpacer height="8px" />
          <MjmlText
            padding="0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            <br />
            Konstnärscentrum
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </MjmlBody>
  </Mjml>
);

export default MemberInvitation