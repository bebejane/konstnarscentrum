import { useEffect, useState } from "react";
import { VideoBlockEditor, PhotoBlockEditor, EditBox } from "/components";
import s from './index.module.scss'

type PortfolioProps = {
  setBlock: (block: ImageRecord | VideoRecord | undefined) => void
  onChange: (block: ImageRecord | VideoRecord | undefined) => void
  onContentChange: (content: MemberModelContentField[]) => void
  onRemove: (id: string) => void
  onClose: () => void
  content: MemberModelContentField[]
  block: ImageRecord | VideoRecord | undefined
  show: boolean
  saving: boolean
}

export default function Portfolio({ onClose, onRemove, content, block, setBlock, onChange, onContentChange, saving }: PortfolioProps) {

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
          <VideoBlockEditor
            block={block}
            onClose={handleClose}
            onChange={handleChange}
          />
          : null
      }

      {content?.filter((b) => (b.__typename === 'ImageRecord' && b.image.length === 0) || (b.__typename === 'VideoRecord' && !b.video)).map((block, idx) =>
        <div key={idx} className={s.newBlock} data-editable={JSON.stringify(block)}>
          {block.__typename === 'ImageRecord' ?
            <img src={'/images/noimage.svg'} />
            :
            block.__typename === 'VideoRecord' ?
              <img src={'/images/novideo.svg'} />
              : null
          }
        </div>
      )}
      <div className={s.addButtons}>
        <button
          className={s.addSection}
          onClick={() => onContentChange([...content, { __typename: 'ImageRecord', image: [] }])}
        >
          Lägg till bild
        </button>
        <button
          className={s.addSection}
          onClick={() => onContentChange([...content, { __typename: 'VideoRecord', video: undefined }])}
        >
          Lägg till video
        </button>
      </div>
    </>
  )
}
