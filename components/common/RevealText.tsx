import s from './RevealText.module.scss'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
  children: string
  start?: boolean
  className?: string
}

export default function RevealText({ children: text, className, start = false }: Props) {

  const [delays, setDelays] = useState([])
  const { inView, ref } = useInView({ triggerOnce: true })
  const animationTime = 0.65

  useEffect(() => {
    const delays = new Array(text.length).fill(0).map((el, idx) => idx * (animationTime / text.length)).sort(() => Math.random() > 0.5 ? 1 : -1)
    setDelays(delays)
  }, [setDelays, text])

  const startAnimation = start === true ? true : start === false ? false : start === undefined && inView

  return (
    <>
      {text.split('').map((c, idx) =>
        <span
          key={idx}
          ref={idx === 0 ? ref : undefined}
          className={s.char}
          style={{
            animationName: startAnimation ? 'show' : undefined,
            animationDelay: `${delays[idx]}s`
          }}
        >{c}</span>
      )}
    </>
  )
}