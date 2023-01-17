import s from './Loader.module.scss'
import cn from 'classnames'
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  message?: string
  loading?: boolean
  className?: string
}

export default function Loader({ message, loading = true, className }: Props) {
  if (!loading) return null
  const size = 20

  return (
    <div className={cn(s.container, className)} style={{ maxHeight: `${size}px` }}>
      <div>
        <ClipLoader size={size} />
        {message && <div>{message}</div>}
      </div>
    </div>
  )
}