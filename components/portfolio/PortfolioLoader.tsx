import s from "./PortfolioLoader.module.scss";
import cn from 'classnames'
import React from "react";
import { Loader } from '/components'

type PortfolioProps = {
  message: string
}

export default function PortfolioLoader({ message }: PortfolioProps) {

  return (
    <div className={s.loader}>
      <Loader message={message} />
    </div>
  )
}
