import { Map } from 'mapbox-gl'
import { useEffect, useRef } from 'react'

interface Props {
  large?: number
}
const MapView = ({ large = 90 }: Props) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    const map = new Map({
      container: mapContainerRef.current, // Usar el ref en lugar del ID
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    })

    return () => map.remove() // Limpia el mapa al desmontar el componente
  }, [])

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: `${large}vh` }}
    />
  )
}

export default MapView
