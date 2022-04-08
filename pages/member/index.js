import styles from './Member.module.scss'
import { requireAuthentication } from "/lib/auth";
import { newsController } from "/controllers";
import { signIn, signOut } from 'next-auth/react'
import { format } from 'date-fns'

export default function Member({session, news}){
  //console.log(session, news)
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
          <p>
            NEWS
          {news.map(n =>
            <div>{n.header} - { format(new Date(n.createdAt), "yyyy-MM-dd HH:mm")}</div>
          )}
          </p>
        </div>
      )}
    </div>
  )
}


export const getServerSideProps = requireAuthentication( async (context, session) => {
	const news = await newsController.all();
	return { 
		props: { 
			session, 
			news 
		}
	};
});