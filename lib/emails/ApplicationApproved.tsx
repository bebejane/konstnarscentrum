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

const ApplicationApproved: React.FC<{ name: string, approvalUrl: string }> = ({ name, approvalUrl }) => (
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
            Hej {name},

          </MjmlText>
          <MjmlText
            padding="24px 0 0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            Varmt välkommen som ny medlem i Konstnärscentrum!<br /><br />
            Som medlem har du möjlighet att skapa en egen konstnärsportfolio på vår hemsida. Portfolion är synlig för både allmänhet och potentiella uppdragsgivare.
            <br /><br />
            Följ denna länk för att skapa ditt användarkonto på Konstnärscentrums hemsida:
          </MjmlText>
          <MjmlSpacer height="24px" />
          <ButtonPrimary link={approvalUrl} uiText={'Skapa konto'} />
          <MjmlSpacer height="8px" />
          <MjmlText
            padding="24px 0 0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            Här kan du även läsa en guide för hur du skapar din konstnärsportfolio.
          </MjmlText>

          <MjmlSpacer height="24px" />
          <ButtonPrimary link={approvalUrl} uiText={'Skapa konto'} />
          <MjmlSpacer height="8px" />
          <MjmlText
            padding="24px 0 0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            Med vänliga hälsningar,
            Konstnärscentrum
          </MjmlText>

        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </MjmlBody>
  </Mjml>
);

export default ApplicationApproved
