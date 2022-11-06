import s from './DistrictSelector.module.scss'
import cn from 'classnames'
import { districts } from "/lib/district";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export type District = {
  id:string,
  name:string,
  slug:string,
}
const defaultDistict = { id:'riks', name: 'Riks', slug:'/'}

export default function DistrictSelector({}){
  const router = useRouter()
  const [selected, setSelected] = useState<District>(defaultDistict)
  const [open, setOpen] = useState(false)

  const handleClick = (e) => setDistrict(e.target.dataset.slug)
  const setDistrict = (slug) =>{
    setSelected(districts.find(d => d.slug === slug) || defaultDistict)
    setOpen(false)
  }
  
  useEffect(()=>{ 
    setDistrict(router?.asPath.split('/')[1])
  }, [router, setSelected])
  
  return (
    <div className={s.container}>
      <div className={s.selected} onClick={()=>setOpen(!open)}>
        {selected?.name}
      </div>
      <ul className={cn(s.districts, open && s.show)}>
        {[defaultDistict, ...districts].map((d, idx) => 
          <Link href={d.slug} key={idx} onClick={handleClick}>
            <li data-slug={d.slug} data-selected={selected.id === d.id}>
              {d.name}
            </li>
          </Link>
        )}
      </ul>
    </div>
  )
}