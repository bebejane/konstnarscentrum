import s from './Loader.module.scss'
import cn from 'classnames'
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  message?: string
  loading?: boolean
  className?: string
  color?: string
}

export default function Loader({ message, loading = true, className, color }: Props) {
  if (!loading) return null
  const size = 20

  return (
    <div className={cn(s.container, className)} style={{ maxHeight: `${size}px` }}>
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