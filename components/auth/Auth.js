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

export function AuthError({ error }) {
  console.log(error)
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

export function SubmitButton({ loading, children, onClick }) {
	return (
    <button className={styles.submitButton} type="submit" onClick={onClick}>
      {!loading ? children : <div className={styles.loader}></div>}
    </button>
  )
}
