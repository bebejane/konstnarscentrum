import React, { useEffect, useState, useCallback, useRef } from 'react'
import { OnProgressInfo } from '@datocms/cma-client-browser';
import { buildClient } from '@datocms/cma-client-browser';
import type { Upload } from '@datocms/cma-client-browser/dist/types/generated/resources';

const client = buildClient({
  apiToken: process.env.NEXT_PUBLIC_UPLOADS_API_TOKEN,
  environment: process.env.NEXT_PUBLIC_GRAPHQL_ENVIRONMENT === 'dev' ? 'dev' : 'main'
});

export type Props = {
  customData?: any,
  accept: string,
  tags?: [],
  onDone: (upload: Upload) => void,
  onUploading: (uploading: boolean) => void,
  onProgress: (percentage: number) => void,
  onError: (err: Error) => void,
}

const FileInput = React.forwardRef<HTMLInputElement, Props>(({
  customData = {},
  tags = [],
  accept,
  onDone,
  onUploading,
  onProgress,
  onError
}, ref) => {

  const [error, setError] = useState<Error | undefined>()
  const [upload, setUpload] = useState<Upload | undefined>()

  const resetInput = useCallback(() => {
    setUpload(undefined)
    onUploading(false)
    setError(undefined)
    ref.current.value = ''
  }, [setUpload, setError, ref])

  const createUpload = useCallback((file: File): Promise<Upload> => {
    if (!file) return Promise.reject(new Error('No file selected'))

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

  }, [customData, onUploading, onProgress, tags, resetInput])

  const handleChange = useCallback((event) => {

    const file = event.target.files[0];
    if (!file) return

    createUpload(file).then((upload) => onDone(upload)).catch((err) => onError(err)).finally(() => onUploading(false))

  }, [createUpload])

  useEffect(() => {

    if (!ref.current) return

    ref.current.removeEventListener('change', handleChange);
    ref.current.addEventListener('change', handleChange);

  }, [ref, createUpload, handleChange])

  useEffect(() => {
    onDone(upload)
  }, [upload])

  useEffect(() => {
    onError(error)
  }, [error])

  return <input type="file" ref={ref} accept={accept} style={{ display: 'none' }} />
})

FileInput.displayName = 'FileInput'
export default FileInput;