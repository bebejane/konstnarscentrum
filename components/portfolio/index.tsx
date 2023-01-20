import s from './index.module.scss'
import { VideoBlockEditor, PhotoBlockEditor, EditBox, MainImageEditor } from "/components";

type PortfolioProps = {
  setMainImage: (image: FileField) => void
  mainImage: FileField | undefined
  setBlock: (block: ImageRecord | VideoRecord | undefined) => void
  onChange: (block: ImageRecord | VideoRecord | undefined) => void
  onChangeMainImage: (image: FileField | undefined) => void
  onContentChange: (content: MemberModelContentField[]) => void
  onRemove: (id: string) => void
  onClose: () => void
  onError: (err: Error) => void
  content: MemberModelContentField[]
  block: ImageRecord | VideoRecord | undefined
  preview: boolean,
  onPreview: () => void
}

export default function Portfolio({
  onClose,
  onRemove,
  content,
  block,
  setBlock,
  mainImage,
  setMainImage,
  onChangeMainImage,
  onChange,
  onContentChange,
  onError,
  preview,
  onPreview,
}: PortfolioProps) {

  return (
    <>
      {!preview &&
        <EditBox
          content={content}
          onContentChange={onContentChange}
          onRemove={onRemove}
          disable={false}
          onSelect={(block) => setBlock(block)}
          onImageSelect={setMainImage}
        />
      }
      {block?.__typename === 'ImageRecord' ?
        <PhotoBlockEditor
          block={block}
          content={content}
          onClose={onClose}
          onChange={onChange}
          onError={onError}
          onUpdate={(b) => setBlock(b)}
        />
        :
        block?.__typename === 'VideoRecord' ?
          <VideoBlockEditor
            block={block}
            onClose={onClose}
            onChange={onChange}
          />
          : null
      }
      {mainImage &&
        <MainImageEditor
          image={mainImage}
          onUpdate={(image) => setMainImage(image)}
          onClose={() => setMainImage(undefined)}
          onSave={onChangeMainImage}
        />
      }

      {content?.filter((b) => (b.__typename === 'ImageRecord' && b.image?.length === 0) || (b.__typename === 'VideoRecord' && !b.video)).map((block, idx) =>
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
          //@ts-ignore
          onClick={() => onContentChange([...content, { __typename: 'ImageRecord', image: undefined }])}
        >
          Lägg till bild
        </button>
        <button
          className={s.addSection}
          //@ts-ignore
          onClick={() => onContentChange([...content, { __typename: 'VideoRecord', video: undefined }])}
        >
          Lägg till video
        </button>
        <button
          className={s.addSection}
          onClick={onPreview}
        >
          {!preview ? 'Preview' : 'Redigera'}
        </button>
      </div>
    </>
  )
}
