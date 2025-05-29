export const generateThumbnailFromVideoUrl = (
  videoUrl: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.crossOrigin = 'anonymous'
    video.src = videoUrl
    video.preload = 'metadata'
    video.muted = true

    video.onloadedmetadata = () => {
      video.currentTime = 1.0
    }

    video.onseeked = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageUrl = canvas.toDataURL('image/png')
        resolve(imageUrl)
      } else {
        reject('No se pudo obtener contexto de canvas')
      }
    }

    video.onerror = (e) => {
      reject('Error cargando el video')
    }
  })
}

export const generateVideoThumbnail = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.src = URL.createObjectURL(file)
    video.crossOrigin = 'anonymous'

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(1, video.duration / 2)
    }

    video.onseeked = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageUrl = canvas.toDataURL('image/png')
        resolve(imageUrl)
        URL.revokeObjectURL(video.src) // liberar memoria
      } else {
        reject('No se pudo obtener contexto de canvas')
      }
    }

    video.onerror = (e) => {
      reject('Error cargando el video')
    }
  })
}
