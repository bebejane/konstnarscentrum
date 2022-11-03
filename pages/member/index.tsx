import styles from './Member.module.scss'
import { requireAuthentication } from "/lib/auth";
import { signIn, signOut } from 'next-auth/react'

export default function Member({session}){
  
  return (
    <div className={styles.container}>
      <h1>Medlems sida</h1>
      {!session && <button onClick={() => signIn()}>SignIn</button> }
      {session && (
        <div className={styles.signedin}>
          <p>
            <small>Du är inloggad som</small>
            <br/>
            <strong>{session.user.email || session.user.name}</strong>
          </p>
          <p>
            <button onClick={() => signOut()}>Logga ut</button>
          </p>
        </div>
      )}
    </div>
  )
}


export const getServerSideProps = requireAuthentication(async (context, session) => {
	return { 
		props: { 
			session
		}
	};
});

