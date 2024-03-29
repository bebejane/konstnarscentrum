import { useEffect } from 'react';
import s from './index.module.scss'
import Link from 'next/link';
import { VideoBlockEditor, PhotoBlockEditor, EditBox, MainImageEditor } from "/components";

const MAX_VIDEOS = 8

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
  member: MemberRecord
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
  member
}: PortfolioProps) {

  useEffect(() => {
    preview && window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [preview])

  const addImageBlock = () => {
    //@ts-ignore
    onContentChange([...content, { __typename: 'ImageRecord', image: undefined }])
  }

  const addVideoBlock = () => {
    if (content.filter(el => el.__typename === 'VideoRecord').length >= MAX_VIDEOS)
      return onError(new Error(`Du är tillåten max ${MAX_VIDEOS} videos i din portfolio`))
    //@ts-ignore
    onContentChange([...content, { __typename: 'VideoRecord', video: undefined }])
  }

  return (
    <div className={s.container}>
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
          member={member}
          key={block.id}
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
          key={mainImage.id}
          member={member}
          image={mainImage}
          onUpdate={(image) => setMainImage(image)}
          onClose={() => setMainImage(undefined)}
          onSave={onChangeMainImage}
        />
      }

      {content?.filter((b) => (b.__typename === 'ImageRecord' && (!b.image || b.image?.length === 0)) || (b.__typename === 'VideoRecord' && !b.video)).map((block, idx) =>
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
        {!preview &&
          <>
            <button
              className={s.addSection}
              onClick={addImageBlock}
            >
              Lägg till bild-sektion
            </button>
            <button
              className={s.addSection}
              onClick={addVideoBlock}
            >
              Lägg till video-sektion
            </button>
          </>
        }
        <div>
          <button
            className={s.addSection}
            onClick={onPreview}
          >
            {!preview ? 'Förhandsvisa' : 'Redigera'}
          </button>
          <Link href={`/konstnar/konto`}>
            <button className={s.back}>
              Tillbaka till konto-sidan
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
