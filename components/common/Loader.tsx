import s from './Loader.module.scss'
import cn from 'classnames'

type Props = {
  message?: string
  loading?: boolean
  className?: string
}

export default function Loader({ message, loading = true, className }: Props) {
  if (!loading) return null

  return (
    <div className={cn(s.container, className)}>
      {message || 'Loading...'}
    </div>
  )
}