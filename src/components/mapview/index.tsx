import { Map, Marker } from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'

interface Props {
  large?: number
  onCoordinatesChange?: (coordinates: { lat: number; lng: number }) => void
}

const MapView = ({ large = 90, onCoordinatesChange }: Props) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map | null>(null)
  const markerRef = useRef<Marker | null>(null)
  const [coordinates, setCoordinates] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const initialized = useRef(false)

  // Función para obtener la ubicación del usuario
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const newCoords = { lat: latitude, lng: longitude }
          setCoordinates({ lat: latitude, lng: longitude })
          if (onCoordinatesChange) onCoordinatesChange(newCoords)
        },
        () => {
          const defaultCoords = { lat: 19.432608, lng: -99.133209 }
          setCoordinates({ lat: 19.432608, lng: -99.133209 })
          if (onCoordinatesChange) onCoordinatesChange(defaultCoords)
        }
      )
    } else {
      const defaultCoords = { lat: 19.432608, lng: -99.133209 }
      setCoordinates({ lat: 19.432608, lng: -99.133209 })
      if (onCoordinatesChange) onCoordinatesChange(defaultCoords)
    }
  }

  // Función para inicializar el mapa
  const initializeMap = () => {
    if (!mapContainerRef.current || !coordinates || initialized.current) return

    console.log('Inicializando mapa con coordenadas:', coordinates)

    // Crear el mapa
    const map = new Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [coordinates.lng, coordinates.lat],
      zoom: 10,
    })

    // Crear el marcador
    const el = document.createElement('div')
    el.className = 'marker'
    const marker = new Marker({ color: '#FF0000' })
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(map)

    // Configurar el evento de clic
    map.on('click', (e) => {
      const { lng, lat } = e.lngLat
      updateMarkerPosition(lng, lat)
    })

    // Guardar referencias
    mapRef.current = map
    markerRef.current = marker
    initialized.current = true

    console.log('Mapa inicializado correctamente')
  }

  // Función para actualizar la posición del marcador
  const updateMarkerPosition = (lng: number, lat: number) => {
    console.log('Actualizando marcador a:', lng, lat)

    if (markerRef.current) {
      markerRef.current.setLngLat([lng, lat])
      setCoordinates({ lat, lng })
      const newCoords = { lat, lng }
      if (onCoordinatesChange) {
        onCoordinatesChange(newCoords)
      }
    }
  }

  // Efecto para obtener la ubicación al montar el componente
  useEffect(() => {
    getUserLocation()

    // Limpiar al desmontar
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
        initialized.current = false
      }
    }
  }, [])

  // Efecto para inicializar el mapa cuando se tengan coordenadas
  useEffect(() => {
    if (coordinates && !initialized.current) {
      initializeMap()
    }
  }, [coordinates])

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: `${large}vh` }}
      data-testid="map-container"
    >
      {coordinates && (
        <div>
          Coordenadas: Lat: {coordinates.lat.toFixed(6)}, Lng:{' '}
          {coordinates.lng.toFixed(6)}
        </div>
      )}
    </div>
  )
}

export default MapView
