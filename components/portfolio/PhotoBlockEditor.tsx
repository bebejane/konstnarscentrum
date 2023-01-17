import s from "./PhotoBlockEditor.module.scss";
import { useState, useRef } from "react";
import { KCImage as Image, MediaLibrary, PortfolioContent, PhotoEditor } from '/components'
import { useRouter } from "next/router";
import { sleep } from "/lib/utils";

export type Props = {
  block: ImageRecord
  onChange: (block: ImageRecord) => void
  content: MemberModelContentField[]
  onClose: () => void
}

export default function PhotoBlockEditor({ block, content, onChange, onClose }: Props) {

  const [image, setImage] = useState<FileField | undefined>()
  const [selected, setSelected] = useState<FileField[] | undefined>()
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)

  const handleSave = async (image: FileField) => {
    const images = [...selected?.map(el => el.id === image?.id ? image : el).filter(i => i)]
    const b = { ...block, image: images }
    console.log({ ...image })
    console.log(b);
    onChange(b)
  }

  return (
    <PortfolioContent
      onClose={onClose}
      header={showMediaLibrary ? 'Välj bilder' : 'Redigera'}
      save={showMediaLibrary ? 'Välj' : 'Spara'}
      saveDisabled={selected?.length === 0}
      onSave={handleSave}
      onBack={showMediaLibrary ? () => setShowMediaLibrary(false) : undefined}
    >
      {image ?
        <PhotoEditor
          image={image}
          onClose={() => setImage(undefined)}
          onSave={handleSave}
          onChoose={() => setShowMediaLibrary(true)}
          onBack={() => setImage(undefined)}
        />
        :
        <MediaLibrary
          multi={true}
          selected={block.image}
          onSelection={(images) => setSelected(images)}
          onSelect={(image) => setImage(image)}
        />
      }
    </PortfolioContent>
  )
}
