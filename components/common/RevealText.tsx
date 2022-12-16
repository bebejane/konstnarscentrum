import s from './RevealText.module.scss'
import { useEffect, useState } from 'react'
type Props = {
  children: string
  className?: string
}

export default function RevealText({ children, className }: Props) {

  const [text, setText] = useState<string | undefined>()

  useEffect(() => {
    let count = children.length;
    const interval = setInterval(() => {
      if (count < 0) return clearInterval(interval)
      setText(children.substring(--count))
    }, 30)

    return () => clearInterval(interval);
  }, [children])

  return (
    <>
      {text}
    </>
  )
}