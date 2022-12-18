import s from './RevealText.module.scss'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export type Props = {
  children: React.ReactNode | string,
  start?: boolean,
  className?: string
}

const animationTime = 0.65

export default function RevealText({ children, className, start }: Props) {

  const text = typeof children === 'string' ? children : children.props.children
  const [delays, setDelays] = useState([])
  const [startAnimation, setStartAnimation] = useState(false)
  const { inView, ref } = useInView({ triggerOnce: true })

  useEffect(() => {
    const delays = new Array(text.length).fill(0).map((el, idx) => idx * (animationTime / text.length)).sort(() => Math.random() > 0.5 ? 1 : -1)
    setDelays(delays)
    setStartAnimation(start === true ? true : start === false ? false : start === undefined && inView)
  }, [setDelays, text, inView, start])

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