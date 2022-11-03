import styles from "./Auth.module.scss";
import text from './text.json'
import Apply from "./Apply";
import Reset from "./Reset";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";
import Link from "next/link";

const components = {
  'apply': Apply,
  'signin': SignIn,
  'signout': SignOut,
  'signup': SignUp,
  'reset': Reset
}

export default function Auth(data : any) {
  
  const {type, error} = data
  const AuthComponent = components[type]

  if(!AuthComponent) 
    return AuthError({error: !error ? `Authentication type ${type} not found!` : error})

  return (
    <>
      <AuthComponent {...data} />
      <AuthLinks {...data} />
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

export function AuthLinks({type, domain}) {
  const links = []
  
  if(['apply', 'reset', 'signup', 'signout'].includes(type))
    links.push({title:text.signIn, href:'/auth?type=signin'})
  else if(type === 'signin'){
    links.push({title:text.apply, href:'/auth?type=apply'})
    links.push({title:text.forgotPassword, href:'/auth?type=reset'})
  }

  return (
    <>
      <p className={styles.authLinks}>
        {links.map(({title, href}, idx)=>
          <Link href={href} key={idx}>
            <a>{title}</a>
          </Link>
        )}
        
      </p>
      <p className={styles.authDomain}>
        <Link href={'/'}>
          <a>Konstnärscentrum</a>
        </Link>
      </p>
    </>
  )
}
export function SubmitButton({ loading, children, onClick }) {
	return (
    <button className={styles.submitButton} type="submit" onClick={onClick}>
      {!loading ? children : <div className={styles.loader}></div>}
    </button>
  )
}
