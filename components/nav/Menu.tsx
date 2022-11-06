import styles from './Menu.module.scss'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react";
import DistrictSelector from './DistrictSelector';

export default function Menu({message}){
  const router = useRouter()

  const { data: session } = useSession();

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
        <DistrictSelector/>
      </div>
    </div>
  )
}