import { MediaAsset } from '../../interfaces/mediaAsset'
import { useFetchWithAuth } from './fetch'

export const useWebMediaAsset = () => {
  const { fetchRequest } = useFetchWithAuth()

  const upload = async (data: MediaAsset) => {
    return fetchRequest({
      url: '/media-assets/upload-url',
      method: 'POST',
      body: data,
    })
  }

  return {
    upload,
  }
}
