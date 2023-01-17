import s from "./VideoBlockEditor.module.scss";
import { useEffect, useState } from "react";
import { PortfolioContent } from "/components";
import YouTube from 'react-youtube';
import { isValidUrl } from "is-youtube-url";

export type Props = {
  block: VideoRecord
  onClose: () => void
  onChange: (video: VideoRecord) => void
}

export default function VideoBlockEditor({ block, onClose, onChange }: Props) {

  const { video, id, title } = block
  const [videoUrl, setVideoUrl] = useState(video?.url)
  const [titleText, setTitleText] = useState(title)
  const [youtubeId, setYoutubeId] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const handleChange = ({ target: { value } }) => {

    setVideoUrl(value)

    try {
      if (!isValidUrl(value))
        throw 'not valid'

      const u = new URL(value)
      const id = u.searchParams.get('v')
      setYoutubeId(id)

      setError(undefined)

    } catch (err) {
      setError('Url är ej en giltig youtube url...')
    }
  }
  const handleSave = () => {
    onChange({
      ...block,
      video: {
        url: videoUrl,
        title: titleText,
      }
    })
  }
  const handleReady = (e) => console.log(e.target.getPlayerState());

  useEffect(() => {
    handleChange({ target: { value: video?.url } })
    setTitleText(video?.title)
  }, [])

  return (
    <PortfolioContent
      header={'Redigera video'}
      save={'Spara'}
      onClose={onClose}
      onSave={handleSave}
      saveDisabled={false}
    >
      <div className={s.container}>

        <div className={s.youtube}>
          {youtubeId &&
            <YouTube videoId={youtubeId} onReady={handleReady} />
          }
        </div>
        <label htmlFor="title">Titel</label>
        <input name="titel" type="text" value={titleText} onChange={({ target: { value } }) => setTitleText(value)} />

        <label htmlFor="url">Youtube URL</label>
        <input name="url" type="text" value={videoUrl} onChange={handleChange} />
        {error && <div className={s.error}>{error}</div>}
      </div>
    </PortfolioContent>

  )
}