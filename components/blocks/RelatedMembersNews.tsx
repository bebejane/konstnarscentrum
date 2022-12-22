import { StructuredContent } from '/components'

export type TextBlockProps = {
  data: RelatedMembersNewsRecord
}

export default function RelatedMembersNews({ data: { membersNews: { id, content } } }: TextBlockProps) {

  return <StructuredContent id={id} content={content} />
}