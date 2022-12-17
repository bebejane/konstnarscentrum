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

  const animationTime = 0.65
  const delays = new Array(text.length).fill(0).map((el, idx) => idx * (animationTime / text.length)).sort(() => Math.random() > 0.5 ? 1 : -1)

  return (
    <>
      {text.split('').map((c, idx) =>
        <span
          key={idx}
          className={s.char}
          style={{ animationDelay: `${delays[idx]}s` }}
        >{c}</span>
      )}
    </>
  )
}