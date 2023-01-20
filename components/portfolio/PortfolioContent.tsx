import s from "./PortfolioContent.module.scss";
import cn from 'classnames'
import React from "react";
import { PortfolioLoader } from '/components'

export type Props = {
  onClose: () => void
  onSave: (image?: FileField) => void
  onBack?: () => void
  header: string
  save: string
  back?: string
  saveDisabled: boolean
  children: React.ReactNode
  loading?: string
}

export default function PortfolioContent({ header, save, back, saveDisabled, children, onClose, onSave, onBack, loading }: Props) {

  return (
    <div id="edit-photo" className={s.photoEditor}>
      <div>
        <div className={cn(s.bar, s.top)}>
          <header><span>{header}</span></header>
          <button type="button" onClick={onClose}>Stäng</button>
        </div>
        <div className={s.content}>
          {children}
        </div>
        <div className={cn(s.bar, s.bottom)}>
          <header>
            {back && <button type="button" onClick={() => onBack?.()}>{back}</button>}
          </header>
          <button type="button" disabled={saveDisabled} onClick={() => onSave()}>{save}</button>
        </div>
        {loading && <PortfolioLoader message={loading} />}
      </div>
    </div>
  )
}
