import { StructuredContent } from '/components'

export type TextBlockProps = {
  data: RelatedMembersNewsRecord
}

export default function RelatedMembersNews({ data: { membersNews: { content } } }: TextBlockProps) {

  return <StructuredContent content={content} />
}