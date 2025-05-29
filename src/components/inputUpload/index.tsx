import { useEffect, useState } from 'react'
import {
  MediaAsset,
  MediaAssetResponse,
  MediaAssetUpload,
} from '../../interfaces/mediaAsset'
import { useWebMediaAsset } from '../../api/webApiMediaAsset'
import { Camera, VideoCamera } from '@phosphor-icons/react'
import {
  generateThumbnailFromVideoUrl,
  generateVideoThumbnail,
} from '../../utils/mediaAssets'

interface Props {
  title: string
  type: 'image' | 'video'
  previewUrl?: string | null
}

export function useInputUpload({ title, type, previewUrl }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [key, setKey] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(previewUrl ?? null)
  const [mediaUpload, setMediaUpload] = useState<MediaAssetUpload | null>(null)
  const { uploadAsset, deleteAsset } = useWebMediaAsset()

  useEffect(() => {
    if (previewUrl) {
      generateThumbnailFromVideoUrl(previewUrl)
        .then(setPreview)
        .catch(() => setPreview(previewUrl)) // fallback, muestra el video
    } else {
      setPreview(previewUrl ?? null)
    }
  }, [previewUrl])

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      if (file.type.split('/')[0] === 'video') {
        try {
          const thumbnail = await generateVideoThumbnail(file)
          setPreview(thumbnail)
        } catch {
          // fallback en caso de error
          setPreview(URL.createObjectURL(file))
        }
      } else {
        setPreview(URL.createObjectURL(file))
      }
      setMediaUpload({
        fileName: file.name,
        mimeType: file.type,
        assetType: file.type.split('/')[0],
        fileExtension: file.name.split('.').pop() || '',
      })
    }
  }

  const uploadMediaAsset = async () => {
    try {
      if (mediaUpload && file) {
        const response = (await uploadAsset(mediaUpload)) as MediaAssetResponse
        const { url, headers, key } = response
        setKey(key)
        const uploadAssets: any = await fetch(url, {
          headers: {
            ...headers,
          },
          method: 'PUT',
          body: file,
        })
        if (!uploadAssets.ok) {
          throw new Error(
            `Error ${uploadAssets.status}: ${uploadAssets.statusText}`
          )
        }
        return {
          fileKey: key,
          originalName: mediaUpload.fileName,
          mimeType: mediaUpload.mimeType,
          fileSize: file.size,
          assetType: mediaUpload.assetType,
        } as MediaAsset
      }
      return false
    } catch (error) {
      console.error('uploadMediaAsset error:', error)
    }
  }

  const deleteMediaAsset = async (key: string) => {
    try {
      await deleteAsset(key)
    } catch (error) {
      console.error('deleteMediaAsset error:', error)
    }
  }

  const renderPreview = () => {
    if (!preview || !preview) return null

    const commonClasses =
      'absolute inset-0 w-full h-full object-contain rounded-full'

    return type === 'video' ? (
      <video src={preview} className={commonClasses} controls />
    ) : (
      <img src={preview} alt="Preview" className={commonClasses} />
    )
  }

  const component = (
    <>
      <span className="text-lg">{title}</span>
      <div className="flex gap-4 rounded-xl mt-2 p-2 flex-wrap">
        <label className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-gray-400 cursor-pointer bg-gray-100 dark:bg-gray-700 hover:border-gray-600 overflow-hidden">
          {preview ? (
            renderPreview()
          ) : (
            <span className="text-gray-500 dark:text-gray-300 text-sm text-center">
              Logo
              {/* <Upload size={25} className="absolute" /> */}
            </span>
          )}

          <input
            type="file"
            accept="image/*,video/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </label>
        {file && file.type.split('/')[0] == 'video' ? (
          <VideoCamera size={25} className="mt-16 -ml-12 z-50" />
        ) : type === 'video' ? (
          <VideoCamera size={25} className="mt-16 -ml-12 z-50" />
        ) : (
          <Camera size={25} className="mt-16 -ml-12 z-50" />
        )}
        <div className="rounded-lg p-2 h-[80%] mt-2 text-xs bg-gray-100 w-fit text-gray-700">
          <p className="font-semibold">
            <span className="font-normal">Formatos</span> JPG, PNG, MP4, WEBM
          </p>
          <p className="font-semibold">
            <span className="font-normal">Dimensiones sugeridas</span> 250 x
            250px
          </p>
          <p className="font-semibold">
            <span className="font-normal">Peso máximo</span> 20MB
          </p>
        </div>
      </div>
    </>
  )

  return { component, uploadMediaAsset, deleteMediaAsset, key }
}
