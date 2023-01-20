import { useState } from "react";
import { MediaLibrary, PortfolioContent, PhotoEditor } from '/components'

export type Props = {
  block: ImageRecord
  onChange: (block: ImageRecord) => void
  onUpdate: (block: ImageRecord) => void
  onError: (err: Error) => void
  content: MemberModelContentField[]
  onClose: () => void
}

export default function PhotoBlockEditor({ block, onError, onChange, onUpdate, onClose }: Props) {

  const [image, setImage] = useState<FileField | undefined>()
  const [selected, setSelected] = useState<FileField[] | undefined>(block.image)
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)

  const handleSave = async () => {

    if (showMediaLibrary) return setShowMediaLibrary(false)
    if (image) return setImage(undefined)

    const images = [...selected?.map(el => el.id === image?.id ? image : el).filter(i => i)]
    const b = { ...block, image: images }
    onChange(b)
  }

  const handleUpdateImage = async (image: FileField) => {
    const sel = [...selected?.map(el => el.id === image?.id ? image : el).filter(i => i)]
    onUpdate({ ...block, image: block.image.map(i => i.id === image.id ? image : i) })
    setImage(image)
  }

  const handleBack = () => {
    if (showMediaLibrary) {
      setShowMediaLibrary(false)
      setImage(undefined)
    }
    else if (image)
      setImage(undefined)
  }

  const header = showMediaLibrary ? 'Välj bild(er)' : 'Redigera'
  const save = showMediaLibrary || image ? 'Ok' : 'Spara'
  const back = (showMediaLibrary || image !== undefined) ? 'Tillbaka' : undefined

  return (
    <PortfolioContent
      onClose={onClose}
      header={header}
      save={save}
      back={back}
      onBack={handleBack}
      saveDisabled={selected?.length === 0}
      onSave={handleSave}
    >
      {image ?
        <PhotoEditor
          image={image}
          onClose={() => setImage(undefined)}
          onUpdate={handleUpdateImage}
          onChoose={() => setShowMediaLibrary(true)}
        />
        :
        <MediaLibrary
          multi={true}
          selected={block.image}
          onShowLibrary={() => setShowMediaLibrary(true)}
          showLibrary={showMediaLibrary}
          onSelection={(images) => setSelected(images)}
          onSelect={(image) => setImage(image)}
          onError={onError}
        />
      }
    </PortfolioContent>
  )
}
