import styles from './Menu.module.scss'
import { districts } from "/lib/district";
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react";

export default function Menu({message}){
  const router = useRouter()
  const [district, setDistrict] = useState(router?.asPath.split('/')[1])
  const { data: session } = useSession();

  useEffect(()=>{
    districts.forEach((d)=>{
      router.prefetch(`/${d.slug}`)
    })
  }, [])

  return (
    <div className={styles.container}>
      <div><b><Link href={"/"}>Konstnärscentrum</Link></b></div>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <a onClick={() => !session ? signIn() : signOut()}>
              {!session ? 'Sign in' : 'Sign out'}
            </a>
          </li>
        </ul>
        <select 
          id="district" 
          className={styles.districts} 
          onChange={({target:{value}}) => {
            setDistrict(value)
            router.push('/'+ value)
          }}
          value={district}
        >
          <option value={-1}>Distrikt</option>
          <option value={-1}>-----</option>
          {districts.map((d, idx) => <option key={idx} value={d.slug}>{d.name}</option>)}
        </select>
      </div>
    </div>
  )
}