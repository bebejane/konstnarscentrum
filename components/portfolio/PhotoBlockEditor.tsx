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
  const [isMediaLibrary, setIsMediaLibrary] = useState(false)

  const handleSave = async () => {

    if (block.__typename !== 'ImageRecord') return

    if (isMediaLibrary) {
      if (selected.length)
        setBlock({ ...block, image: selected })

      return setIsMediaLibrary(false)
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
    console.log('back', isMediaLibrary, block.image);

    if (isMediaLibrary) {
      setImage(undefined)
      setSelected(undefined)
      setIsMediaLibrary(false)
    }
    else if (image)
      setImage(undefined)
  }

  const handleSelection = (images: FileField[]) => {
    setSelected(images)
  }

  const handleRemove = (id: string) => {
    if (block.__typename !== 'ImageRecord') return
    onUpdate({ ...block, image: block.image.filter((i) => i.id !== id) })
  }

  useEffect(() => setBlock(blockFromProps), [blockFromProps])

  if (!block) return null

  return (
    !image?.responsiveImage ?
      <PortfolioContent
        onClose={onClose}
        header={!isMediaLibrary ? 'Redigera' : 'Välj bild(er)'}
        back={!isMediaLibrary ? undefined : 'Tillbaka'}
        save={!isMediaLibrary ? 'Spara' : 'Välj'}
        onBack={handleBack}
        saveDisabled={selected?.length === 0}
        onSave={handleSave}
      >
        <MediaLibrary
          key={isMediaLibrary ? 'medialibrary' : 'mediaselection'}
          multi={true}
          selected={block.__typename === 'ImageRecord' ? block.image : undefined}
          onShowLibrary={() => setIsMediaLibrary(true)}
          showLibrary={isMediaLibrary}
          onSelection={handleSelection}
          onSelect={(image) => setImage(image)}
          onRemove={handleRemove}
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
          key={image.id}
          image={image}
          onClose={() => setImage(undefined)}
          onUpdate={handleUpdateImage}
          onChoose={() => setIsMediaLibrary(true)}
        />
      </PortfolioContent >


  )
}
