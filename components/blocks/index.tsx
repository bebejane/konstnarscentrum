import * as Components from '/components'

export type BlockProps = { data: any, recordId: string, onClick?: (id: string) => void, editable?: any }

export default function Block({ data, recordId, onClick, editable }: BlockProps) {
  const type = data.__typename.replace('Record', '');
  const BlockComponent = Components[type]

  if (!BlockComponent)
    return <div>No block match {data.__typename}</div>

  return <BlockComponent data={data} recordId={recordId} onClick={onClick} editable={JSON.stringify(editable)} />
}