import s from "./VideoBlockEditor.module.scss";
import cn from 'classnames'
import { useEffect, useState } from "react";
import { PortfolioContent } from "/components";
export type Props = {
  block: VideoRecord
  onClose: () => void
}

export default function VideoBlockEditor({ onClose }: Props) {

  return (
    <PortfolioContent onClose={onClose} header={'Redigera video'} save={'Spara'} onSave={() => { }}>
      <div className={s.container}>
        video
      </div>
    </PortfolioContent>

  )
}