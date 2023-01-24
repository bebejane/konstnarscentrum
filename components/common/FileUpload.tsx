import React, { useEffect, useState, useCallback, useRef } from 'react'
import { OnProgressInfo } from '@datocms/cma-client-browser';
import { buildClient } from '@datocms/cma-client-browser';
import { SimpleSchemaTypes } from '@datocms/cma-client';

const MAX_ALLOWED_IMAGES = 10

const client = buildClient({
  apiToken: process.env.NEXT_PUBLIC_UPLOADS_API_TOKEN,
  environment: process.env.NEXT_PUBLIC_DATOCMS_ENVIRONMENT ?? 'main'
});

export type Props = {
  customData?: any,
  accept: string,
  tags?: string[],
  onDone: (upload: Upload) => void,
  onUploading: (uploading: boolean) => void,
  onProgress: (percentage: number) => void,
  onError: (err: Error) => void,
  mediaLibrary: boolean
}

export type Upload = SimpleSchemaTypes.Upload;

const FileUpload = React.forwardRef<HTMLInputElement, Props>(({
  customData = {},
  tags = [],
  accept,
  onDone,
  onUploading,
  onProgress,
  mediaLibrary,
  onError
}, ref) => {

  const [error, setError] = useState<Error | undefined>()
  const [upload, setUpload] = useState<Upload | undefined>()

  const resetInput = useCallback(() => {
    setUpload(undefined)
    onUploading(false)
    setError(undefined)
    ref.current.value = ''
  }, [setUpload, setError, ref, onUploading])

  const fetchUserImages = async (): Promise<FileField[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch('/api/account/images', { method: 'GET' })
        if (res.status !== 200) reject(new Error('Det uppstod ett fel vid hämtning av bilder'))
        const { images } = await res.json()
        resolve(images)
      } catch (err) {
        reject(err)
      }
    })
  }

  const createUpload = useCallback(async (file: File): Promise<Upload> => {

    if (!file)
      return Promise.reject(new Error('Ingen fil vald'))

    if (mediaLibrary) {
      try {
        const images = await fetchUserImages()
        if (images.length > MAX_ALLOWED_IMAGES)
          return Promise.reject(new Error(`Det går max att ladda upp ${MAX_ALLOWED_IMAGES} antal bilder`))
      } catch (err) {
        setError(err as Error)
        return
      }
    }

    resetInput()
    onUploading(true)

    return new Promise((resolve, reject) => {
      client.uploads.createFromFileOrBlob({
        fileOrBlob: file,
        filename: file.name,
        tags,
        default_field_metadata: {
          en: {
            alt: '',
            title: '',
            custom_data: customData
          }
        },
        onProgress: (info: OnProgressInfo) => {
          if (info.payload && 'progress' in info.payload)
            onProgress(info.payload.progress)
        }
      }).then(resolve).catch(reject)
    })

  }, [customData, onUploading, onProgress, tags, resetInput, mediaLibrary])

  const handleChange = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return
    createUpload(file)
      .then((upload) => onDone(upload))
      .catch((err) => onError(err))
      .finally(() => onUploading(false))
  }, [createUpload, onUploading, onDone, onError])

  useEffect(() => {
    if (!ref.current) return

    ref.current.removeEventListener('change', handleChange);
    ref.current.addEventListener('change', handleChange);
  }, [ref])

  useEffect(() => { onDone(upload) }, [upload])
  useEffect(() => { onError(error) }, [error])

  return <input type="file" ref={ref} accept={accept} style={{ display: 'none' }} />
})

FileUpload.displayName = 'FileUpload'
export default FileUpload;