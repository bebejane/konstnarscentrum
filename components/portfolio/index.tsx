import { useEffect, useState } from "react";
import { VideoBlockEditor, PhotoBlockEditor, EditBox } from "/components";


type PortfolioProps = {
  onSave: () => void,
  setBlock: (block: ImageRecord | VideoRecord | undefined) => void
  onChange: (block: ImageRecord | VideoRecord | undefined) => void,
  onContentChange: (content: MemberModelContentField[]) => void,
  onRemove: (id: string) => void,
  onClose: () => void,
  content: MemberModelContentField[],
  block: ImageRecord | VideoRecord | undefined
  show: boolean
}

export default function Portfolio({ onSave, onClose, onRemove, content, block, setBlock, onChange, onContentChange }: PortfolioProps) {

  //const [block, setBlock] = useState<MemberModelContentField | undefined>(blockFromProps)
  const handleClose = () => {
    onClose()
  }
  const handleChange = (b) => {
    onChange(b)
  }
  return (
    <>
      <EditBox
        content={content}
        onContentChange={onContentChange}
        onRemove={onRemove}
        onSelect={(block) => setBlock(block)}
      />
      {block?.__typename === 'ImageRecord' ?
        <PhotoBlockEditor
          block={block}
          content={content}
          onClose={handleClose}
          onChange={handleChange}
        />
        :
        block?.__typename === 'VideoRecord' ?
          <VideoBlockEditor block={block} onClose={handleClose} onChange={handleChange} />
          : null
      }
    </>
  )
}
