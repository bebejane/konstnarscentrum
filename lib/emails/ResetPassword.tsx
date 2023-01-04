import { ReactElement } from "react";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Line from "./components/Line";

import ButtonPrimary from "./components/ButtonPrimary";
import { leadingRelaxed, textBase } from "./components/theme";

import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlSpacer,
  MjmlDivider,
} from "mjml-react";

type ResetPasswordProps = {
  link: string,
  body: ReactElement;
  ctaText: string;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({
  link,
  body,
  ctaText,
}) => {
  return (
    <Mjml>
      <Head />
      <MjmlBody width={600}>
        <Header loose />
        <MjmlSection padding="0 24px" cssClass="smooth">
          <MjmlColumn>
            <Line
              padding="0 0 32px 0"
            ></Line>
            <MjmlText
              cssClass="paragraph"
              padding="0"
              fontSize={textBase}
              lineHeight={leadingRelaxed}
            >
              <>{body}</>
            </MjmlText>
            <MjmlSpacer height="24px" />
            <ButtonPrimary link={link} uiText={ctaText} />
            <MjmlSpacer height="8px" />
            <MjmlText
              padding="16px 0"
              fontSize={textBase}
              lineHeight={leadingRelaxed}
              cssClass="paragraph"
            >
              Konstnärscentrum
            </MjmlText>
            <Line
              padding="16px 0 0"
            ></Line>
          </MjmlColumn>
        </MjmlSection>
        <Footer />
      </MjmlBody>
    </Mjml>
  );
};

export default ResetPassword;
