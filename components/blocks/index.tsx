import * as Components from '/components'

export type BlockProps = { data: any, onClick?: Function, editable?: any }

export default function Block({ data, onClick, editable }: BlockProps) {
  const type = data.__typename.replace('Record', '');
  const BlockComponent = Components[type]

  if (!BlockComponent)
    return <div>No block match {data.__typename}</div>

  return <BlockComponent data={data} onClick={onClick} editable={JSON.stringify(editable)} />
}