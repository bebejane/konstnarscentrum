import { useEffect, useState } from "react";
import { MediaLibrary, PortfolioContent, PhotoEditor } from '/components'

export type Props = {
  block: ImageRecord
  onChange: (block: ImageRecord) => void
  onUpdate: (block: ImageRecord) => void
  onError: (err: Error) => void
  content: MemberModelContentField[]
  onClose: () => void
}

export default function PhotoBlockEditor({ block: blockFromProps, onError, onChange, onUpdate, onClose }: Props) {

  const [image, setImage] = useState<FileField | undefined>()
  const [block, setBlock] = useState<MemberModelContentField | undefined>()
  const [selected, setSelected] = useState<FileField[] | undefined>(blockFromProps.image)
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)

  const handleSave = async () => {

    if (block.__typename !== 'ImageRecord') return

    if (showMediaLibrary) {
      if (selected.length)
        setBlock({ ...block, image: selected })

      return setShowMediaLibrary(false)
    }
    if (image)
      return setImage(undefined)

    const images = [...selected?.map(el => el.id === image?.id ? image : el).filter(i => i)]
    const b = { ...block, image: images }
    onChange(b)
  }

  const handleSaveImage = () => {

    if (block.__typename !== 'ImageRecord') return
    onUpdate({ ...block, image: block.image.map((i) => i.id === image.id ? image : i) })
    setImage(undefined)
  }
  const handleUpdateImage = async (image: FileField) => {
    if (block.__typename !== 'ImageRecord') return
    const updatedBlock = { ...block, image: block.image.map(i => i.id === image.id ? image : i) }
    setSelected(selected?.map((i) => i.id === image.id ? image : i))
    onUpdate(updatedBlock)
    setImage(image)
  }

  const handleBack = () => {
    if (showMediaLibrary) {
      setImage(undefined)
      setSelected(undefined)
      setShowMediaLibrary(false)
    }
    else if (image)
      setImage(undefined)
  }

  useEffect(() => setBlock(blockFromProps), [blockFromProps])

  if (!block) return null

  return (
    !image?.responsiveImage ?
      <PortfolioContent
        onClose={onClose}
        header={!showMediaLibrary ? 'Redigera' : 'Välj bild(er)'}
        back={!showMediaLibrary ? undefined : 'Tillbaka'}
        save={!showMediaLibrary ? 'Spara' : 'Ok'}
        onBack={handleBack}
        saveDisabled={selected?.length === 0}
        onSave={handleSave}
      >
        <MediaLibrary
          multi={true}
          selected={block.__typename === 'ImageRecord' ? block.image : undefined}
          onShowLibrary={() => setShowMediaLibrary(true)}
          showLibrary={showMediaLibrary}
          onSelection={(images) => setSelected(images)}
          onSelect={(image) => setImage(image)}
          onError={onError}
        />
      </PortfolioContent>
      :
      <PortfolioContent
        onClose={onClose}
        header={'Redigera bild'}
        save={'Ok'}
        back={'Tillbaka'}
        onBack={() => setImage(undefined)}
        saveDisabled={false}
        onSave={handleSaveImage}
      >
        <PhotoEditor
          image={image}
          onClose={() => setImage(undefined)}
          onUpdate={handleUpdateImage}
          onChoose={() => setShowMediaLibrary(true)}
        />
      </PortfolioContent >


  )
}
