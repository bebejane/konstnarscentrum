import s from "./VideoBlockEditor.module.scss";
import { useEffect, useState, useCallback } from "react";
import { PortfolioContent } from "/components";
import YouTube from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo'

export type Props = {
  block: VideoRecord
  onClose: () => void
  onChange: (video: VideoRecord) => void
}

const providers = ['youtube', 'vimeo', 'youtu.be']

export default function VideoBlockEditor({ block, onClose, onChange }: Props) {

  const { video } = block
  const [videoData, setVideoData] = useState(video)
  const [videoUrl, setVideoUrl] = useState(video?.url)
  const [titleText, setTitleText] = useState<string | undefined>()
  const [error, setError] = useState<Error | undefined>()

  const parseVideoUrl = useCallback((videoUrl: string): any => {

    try {
      let u: URL;

      try {
        u = new URL(videoUrl)
      } catch (err) {
        throw new Error('URL är ej giltig...')
      }

      if (!providers.find(provider => u.hostname.indexOf(provider) > -1))
        throw new Error('URL är ej giltig...')
      if (u.hostname.indexOf('youtube') > -1) {
        //if (!u.searchParams.get('v'))
        //throw new Error('Youtube URL är ej giltig...')
      }
      if (u.hostname.indexOf('vimeo') > -1) {
        if (isNaN(parseInt(u.pathname.slice(1))))
          throw new Error('Vimeo URL är ej giltig...')
      }
      const url = u.href;
      const title = titleText
      const provider = ['youtube', 'youtu.be'].find(el => u.hostname.indexOf(el) > -1) ? 'youtube' : 'vimeo'
      const providerUid = provider === 'youtube' ? u.searchParams.get('v') : u.pathname.slice(1);
      return {
        url,
        title,
        provider,
        providerUid,
        height: undefined,
        width: undefined,
        thumbnailUrl: undefined
      }

    } catch (err) {
      setVideoData(undefined)
      throw new Error(err)
    }

  }, [titleText])

  const handleChange = useCallback(({ target: { value } }) => {

    setVideoUrl(value)
    setError(undefined)
    setVideoData(undefined)

    if (!value) return

    try {
      const videoData = parseVideoUrl(value)
      setVideoData(videoData)
    } catch (err) {
      setError(err)
    }
  }, [parseVideoUrl])

  const handleSave = () => onChange({ ...block, video: { ...videoData, title: titleText } })

  useEffect(() => {
    if (!video) return
    handleChange({ target: { value: video?.url } })
    setTitleText(video?.title)
  }, [setTitleText, video])

  return (
    <PortfolioContent
      header={'Redigera video'}
      save={'Spara'}
      onClose={onClose}
      onSave={handleSave}
      saveDisabled={!videoData || !titleText}
    >
      <div className={s.container}>
        <div className={s.youtube}>
          {videoData && videoData.provider === 'youtube' &&
            <YouTube videoId={videoData.providerUid} style={{ height: '100%' }} />
          }
          {videoData && videoData.provider === 'vimeo' &&
            <Vimeo video={videoData.providerUid} style={{ height: '100%' }} />
          }
        </div>

        <label htmlFor="title">Titel</label>
        <input
          name="titel"
          type="text"
          value={titleText}
          maxLength={160}
          onChange={({ target: { value } }) => setTitleText(value)}
        />

        <label htmlFor="url">Video URL (Youtube, Vimeo)</label>
        <input
          name="url"
          type="text"
          value={videoUrl}
          onChange={(e) => handleChange(e)}
        />

        {<div className={s.error}>{error?.message}</div>}
      </div>
    </PortfolioContent>

  )
}