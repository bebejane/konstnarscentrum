
import s from './RelatedMemberNews.module.scss'
import React from 'react'
import Link from 'next/link'
import { StructuredContent } from '/components'

export type RelatedMembersNewsBlockProps = {
  data: {
    memberNews: MemberNewsRecord[]
  },
  onClick: Function
}

export default function RelatedMembersNews({ data: { memberNews }, onClick }: RelatedMembersNewsBlockProps) {

  return (
    <div>
      membernews linked
    </div>
  )
}
