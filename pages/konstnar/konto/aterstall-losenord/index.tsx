import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { GetStaticProps } from "next";
import Reset from "/components/account/Reset";
import { ClientSafeProvider, getCsrfToken, getProviders, useSession } from "next-auth/react";
import { RevealText } from "/components";
import { useEffect, useState } from "react";
import { Loader } from "/components";

export type Props = {
  csrfToken: string,
  token: string
}

export default function ResetPassword({ token }: Props) {

  const [csrfToken, setCsrfToken] = useState<string | undefined>()
  const { data, status } = useSession()

  useEffect(() => {
    getCsrfToken().then(token => setCsrfToken(token))

  })

  return (
    <div className={s.container}>
      {status === 'loading' ?
        <Loader />
        :
        <>
          <h1><RevealText>Återställ lösenord</RevealText></h1>
          <p className="intro">
            intro text
          </p>
          <Reset token={token} />
        </>
      }
    </div>
  );
}

ResetPassword.page = { crumbs: [{ slug: 'konstnar/konto', title: 'Konto' }], regional: false } as PageProps

export const getServerSideProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
  const { token } = context.query

  return {
    props: {
      ...props,
      token: token ?? null
    }

  };
});