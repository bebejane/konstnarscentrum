import s from './RevealText.module.scss'
import { useEffect, useState } from 'react'
type Props = {
  children: string
  className?: string
}

export default function RevealText({ children, className }: Props) {

  const [text, setText] = useState<string | undefined>(children)

  useEffect(() => {
    return
    let count = children.length;
    const interval = setInterval(() => {
      if (count < 0) return clearInterval(interval)
      setText(children.substring(--count))
    }, 30)

    return () => clearInterval(interval);
  }, [children])

  return (
    <>
      {text.split('').map((c, idx) =>
        <span
          key={idx}
          className={s.char}
          style={{ animationDelay: `${Math.min(0.2 + Math.random(), 0.5)}s` }}
        >{c}</span>
      )}
    </>
  )
}