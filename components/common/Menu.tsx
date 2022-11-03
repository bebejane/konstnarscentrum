import styles from './Menu.module.scss'
import districts from '/districts.json'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Menu({message}){
  const router = useRouter()
  const [district, setDistrict] = useState(router.asPath.split('/')[1])
  

  useEffect(()=>{
    if(!district || district == '-1') return
    router.push(`/${district}`)
  }, [district])
  
  useEffect(()=>{
    districts.forEach((d)=>{
      router.prefetch(`/${d.slug}`)
    })
  }, [])

  return (
    <div className={styles.container}>
      <div><b><Link href={"/"}>Konstnärscentrum</Link></b></div>
      <div>
        <Link href={"/auth?type=signin"}>Medlemmar</Link>
        <select 
          id="district" 
          className={styles.districts} 
          onChange={({target:{value}}) => setDistrict(value)}
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