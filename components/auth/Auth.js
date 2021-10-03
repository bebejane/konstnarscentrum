import styles from "./Auth.module.scss";
import Apply from "./Apply";
import Reset from "./Reset";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";

const components = {
  'apply': Apply,
  'signin': SignIn,
  'signout': SignOut,
  'signup': SignUp,
  'reset': Reset
}

export default function Auth(data) {
  const {type} = data
  const AuthComponent = components[type]

  if(!AuthComponent) 
    return AuthError({error:`Authentication type ${type} not found`})

  return (
    <AuthComponent {...data}/>
  )
}

export function SubmitButton({ loading, children, onClick }) {
	return (
    <button className={styles.submitButton} type="submit" onClick={onClick}>
      {!loading ? children : <div className={styles.loader}></div>}
    </button>
  )
}

export function AuthError({ error }) {
	return (
    <div className={styles.error}>
      <h1 className={styles.errorHeader}>
        Authentication Error
      </h1>
      <div className={styles.errorBox}>
        {error}
      </div>
    </div>

  )
}