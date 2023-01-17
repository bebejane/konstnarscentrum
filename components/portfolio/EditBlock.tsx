import s from "./EditBlock.module.scss";
import cn from 'classnames'
import { useEffect, useState } from "react";
import EditIcon from '/public/images/edit.svg'

export type EditBlockProps = {
  data: ImageRecord | VideoRecord
}

export default function EditBlock({ data }: EditBlockProps) {

  const [editable, setEditable] = useState<any | undefined>()
  const [images, setImages] = useState<FileField[] | undefined>()
  //useEffect(() => { init() }, [blocks])

  return (
    <div className={s.container}>
      {data.__typename === 'ImageRecord' ?
        <ImageEditBlock data={data} />
        :
        data.__typename === 'VideoRecord' ?
          <VideoEditBlock data={data} />
          :
          null
      }
    </div>
  )
}

export function VideoEditBlock({ id, }) {

  return (
    <div className={s.block}>{data.__typename}</div>
  )
}

export function ImageEditBlock({ id }) {

  return (
    <div className={s.block}>{data.__typename}</div>
  )
}
