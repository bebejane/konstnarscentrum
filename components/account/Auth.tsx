import styles from "./index.module.scss";
import text from './text.json'
import Apply from "./Apply";
import Reset from "./Reset";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";
import Link from "next/link";
import React from "react";
import Loader from "/components/common/Loader";

const components = {
  'apply': Apply,
  'signin': SignIn,
  'signout': SignOut,
  'signup': SignUp,
  'reset': Reset
}

export default function Auth(data: any) {

  const { type, error } = data
  const AuthComponent = components[type]

  if (!AuthComponent)
    return AuthError({ error: !error ? `Authentication type ${type} not found!` : error })

  return (
    <>
      <AuthComponent {...data} />
    </>
  )
}

export function AuthError({ error }) {
  const message = typeof error === "string" ? error : error.message || error.toString()

  return (
    <div className={styles.error}>
      <h1 className={styles.errorHeader}>
        Authentication Error
      </h1>
      <div className={styles.errorBox}>
        {message}
      </div>
    </div>

  )
}

export function AuthLinks({ type, domain }) {
  const links = []

  if (['apply', 'reset', 'signup', 'signout'].includes(type))
    links.push({ title: text.signIn, href: '/konstnar/auth?type=signin' })
  else if (type === 'signin') {
    links.push({ title: text.apply, href: '/konstnar/auth?type=apply' })
    links.push({ title: text.forgotPassword, href: '/konstnar/auth?type=reset' })
  }

  return (
    <>
      <p className={styles.authLinks}>
        {links.map(({ title, href }, idx) =>
          <Link href={href} key={idx}>
            {title}
          </Link>
        )}

      </p>
      <p className={styles.authDomain}>
        <Link href={'/'}>
          Konstnärscentrum
        </Link>
      </p>
    </>
  )
}
export function SubmitButton({ loading, disabled, children, onClick }: { loading: boolean, disabled: boolean, children: React.ReactNode, onClick?: () => void }) {

  return (
    <button className={styles.submitButton} type="submit" onClick={onClick} disabled={disabled}>
      {!loading ? children : <Loader size={10} />}
    </button>
  )
}
