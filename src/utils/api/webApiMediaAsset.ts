import { MediaAssetUpload } from '../../interfaces/mediaAsset'
import { useFetchWithAuth } from './fetch'

export const useWebMediaAsset = () => {
  const { fetchRequest } = useFetchWithAuth()

  const uploadAsset = async (data: MediaAssetUpload) => {
    return fetchRequest({
      url: '/media-assets/upload-url',
      method: 'POST',
      body: data,
    })
  }
  const deleteAsset = async (key: string) => {
    return fetchRequest({
      url: `/media-assets/${key}`,
      method: 'DELETE',
    })
  }

  return {
    uploadAsset,
    deleteAsset,
  }
}
