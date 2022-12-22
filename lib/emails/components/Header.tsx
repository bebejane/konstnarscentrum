import { MjmlSection, MjmlColumn, MjmlImage } from "mjml-react";

type HeaderProps = {
  loose?: boolean;
};

const Header: React.FC<HeaderProps> = ({ loose }) => {
  return (
    <MjmlSection padding={loose ? "48px 0 40px" : "48px 0 24px"}>
      <MjmlColumn>
        <MjmlImage
          padding="0 20px 0"
          //width="500px"
          //height="54px"
          align="center"
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`}
          cssClass="logo"
        />
      </MjmlColumn>
    </MjmlSection>
  );
};

export default Header;
