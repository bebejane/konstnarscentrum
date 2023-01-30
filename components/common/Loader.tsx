import s from './Loader.module.scss'
import cn from 'classnames'
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  message?: string
  loading?: boolean
  className?: string
  color?: string
  invert?: boolean
}

export default function Loader({ message, loading = true, className, color, invert = false }: Props) {
  if (!loading) return null
  const size = 20

  return (
    <div className={cn(s.container, className, invert && s.invert)} style={{ maxHeight: `${size}px` }}>
      <div>
        <div className={s.anim}>
          <div><span></span><span></span></div>
          <div><span></span><span></span></div>
        </div>
        {message && <div style={color ? { color } : undefined}>{message}</div>}
      </div>
    </div>
  )
}