import { useEffect, useState } from "react";
import { KCImage as Image, MediaLibrary, PortfolioContent, PhotoEditor } from '/components'

export type Props = {
  image: FileField
  onUpdate: (image: FileField) => void
  onSave: (image: FileField) => void
  onClose: () => void
  member: MemberRecord
}

export default function MainImageEditor({ image, onUpdate, onClose, onSave, member }: Props) {

  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const handleSelect = (image: FileField) => {
    onUpdate(image)
    setShowMediaLibrary(false)
  }
  useEffect(() => {
    !image?.id && setShowMediaLibrary(true)
  }, [image])

  return (
    <PortfolioContent
      onClose={onClose}
      header={'Redigera bild'}
      save={showMediaLibrary ? 'Välj' : 'Spara'}
      back={showMediaLibrary ? undefined : 'Välj bild'}
      saveDisabled={false}
      onBack={() => setShowMediaLibrary(true)}
      onSave={() => onSave(image)}
    >
      {!showMediaLibrary ?
        <PhotoEditor
          key={image.id}
          image={image}
          onUpdate={onUpdate}
          onChoose={() => setShowMediaLibrary(true)}
          onClose={onClose}

        />
        :
        <MediaLibrary
          multi={false}
          member={member}
          showLibrary={showMediaLibrary}
          onSelect={handleSelect}
        />
      }
    </PortfolioContent>
  )
}
