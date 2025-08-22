import { Download } from '@phosphor-icons/react'
import { useFetchWithAuth } from '../../api/fetch'
import { useAuth } from '../../hooks/useAuth'

interface Props {
  title: string
  dates: string
}

const DownloadXLSXButton = ({ title, dates }: Props) => {
  const { getToken } = useAuth()

  const handleDownload = async () => {
    const token = getToken()
    if (!token) {
      console.error('No se encontró el token de autenticación.')
      return
    }
    try {
      const response = (await fetch(
        `http://localhost:3000/api/v1/tickets/anahuac-report?${dates}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )) as any

      if (!response.ok) {
        throw new Error('Error al descargar el archivo')
      }

      const blob = await response.blob()

      const disposition = response.headers.get('Content-Disposition')
      const timestamp = Math.floor(Date.now() / 1000)
      let filename = `Reporte_Anahuac_${timestamp}.xlsx`
      if (disposition && disposition.includes('filename=')) {
        filename = disposition.split('filename=')[1].replace(/"/g, '').trim()
      }

      // Crear URL temporal y descargar
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error descargando el archivo:', error)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="flex justify-center gap-2 bg-blue-500 text-white rounded-md px-4 py-2"
    >
      <Download className="mt-1" /> {title}
    </button>
  )
}

export default DownloadXLSXButton
