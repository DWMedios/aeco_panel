import { useState, useEffect, useRef } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { es } from 'date-fns/locale'
import {
  formatDate,
  getFirstAndLastDayOfMonth,
} from '../../../utils/formatDate'
import { eachDayOfInterval, isSameDay } from 'date-fns'
import { useWebApiCampaings } from '../../../api/webApiCampaing'
import { Alert } from '../../../interfaces/types'

interface Props {
  setDates: (queryString: string[]) => void
  campaingData?: any
  companyId?: number | null
  setShowAlert: (alert: Alert) => void
}

const InputDateRangePicker = ({
  setDates,
  companyId,
  setShowAlert,
  campaingData,
}: Props) => {
  // Función que retorna el rango por defecto: desde hoy hasta 5 días después
  const getDefaultRange = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Normalizar a medianoche
    const startDate = new Date(today)
    const endDate = new Date(today)
    endDate.setDate(today.getDate() + 4) // 5 días total (hoy + 4 días más)
    return { startDate, endDate }
  }

  const [selectionRange, setSelectionRange] = useState<any>(() => {
    // Si no, usa rango por defecto
    const { startDate, endDate } = getDefaultRange()
    return { startDate, endDate, key: 'selection' }
  })

  const [open, setOpen] = useState(false)
  const [disabledDates, setDisabledDates] = useState<Date[]>([])

  const { getCampaingsByDate } = useWebApiCampaings()

  // Función para generar fechas pasadas (menores a hoy)
  const getPastDates = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Normalizar a medianoche
    const pastDates = []

    // Generar fechas desde hace un año hasta ayer
    for (let i = 365; i > 0; i--) {
      const pastDate = new Date(today)
      pastDate.setDate(today.getDate() - i)
      pastDates.push(pastDate)
    }

    return pastDates
  }

  useEffect(() => {
    if (companyId) {
      const { startDate, endDate } = getFirstAndLastDayOfMonth()

      const fetchDisabledDates = async () => {
        try {
          let queryString = `startDate=${formatDate(
            startDate
          )}&endDate=${formatDate(endDate)}`
          if (companyId) {
            queryString += `&companyId=${companyId}`
          }
          // Aquí igual podrías enviar el rango seleccionado actual
          setDates([
            formatDate(selectionRange.startDate),
            formatDate(selectionRange.endDate),
          ])

          const res = (await getCampaingsByDate(queryString)) as any

          const fechasBloqueadas = res
            .filter((d: any) => d.count === 5)
            .map((d: any) => new Date(d.date))

          // Combinar fechas bloqueadas con fechas pasadas
          const pastDates = getPastDates()
          const allDisabledDates = [...fechasBloqueadas, ...pastDates]

          setDisabledDates(allDisabledDates)
        } catch (error) {
          console.error('Error al obtener las fechas:', error)
        }
      }

      fetchDisabledDates()
    } else {
      // Si no hay companyId, solo bloquear fechas pasadas
      const pastDates = getPastDates()
      setDisabledDates(pastDates)
    }
  }, [companyId])

  // Sincronizar si cambian las fechas externas (dateSelected)
  useEffect(() => {
    if (Object.keys(campaingData).length > 0) {
      setSelectionRange({
        startDate: new Date(campaingData.startDate.substring(0, 10)),
        endDate: new Date(campaingData.endDate.substring(0, 10)),
        key: 'selection',
      })
    }
  }, [campaingData])

  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection

    const allDatesInRange = eachDayOfInterval({
      start: startDate,
      end: endDate,
    })

    const includesDisabled = allDatesInRange.some((date) =>
      disabledDates.some((disabled) => isSameDay(disabled, date))
    )

    const maxDaysExceeded = allDatesInRange.length > 5

    if (includesDisabled) {
      setShowAlert({
        message:
          'El rango incluye fechas no disponibles. Selecciona otro rango.',
        type: 'error',
      })
      return // para no actualizar el rango inválido
    }

    if (maxDaysExceeded) {
      setShowAlert({
        message: 'Solo puedes seleccionar hasta 5 días.',
        type: 'error',
      })
      return
    }

    setSelectionRange({ startDate, endDate, key: 'selection' })
  }

  useEffect(() => {
    const { startDate, endDate } = selectionRange
    const isRangeSelected =
      startDate && endDate && startDate.getTime() !== endDate.getTime()
    if (isRangeSelected) {
      setDates([formatDate(startDate), formatDate(endDate)])
      setOpen(false)
    }
  }, [selectionRange])

  const pickerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open && pickerRef.current) {
      pickerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [open])

  return (
    <div className="relative">
      <input
        type="text"
        className="w-72 p-3 border border-gray-300 rounded-md focus:outline-none text-xs handPointer"
        value={
          selectionRange.startDate && selectionRange.endDate
            ? `${selectionRange.startDate.toLocaleDateString(
                'es-ES'
              )} - ${selectionRange.endDate.toLocaleDateString('es-ES')}`
            : 'Selecciona un rango de fechas'
        }
        onClick={() => setOpen(!open)}
        readOnly
      />
      {open && (
        <div
          ref={pickerRef}
          className=" bg-white shadow ring-4 ring-slate-200 mt-1 rounded-md max-w-[60%]"
        >
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            showDateDisplay={false}
            months={1}
            direction="horizontal"
            locale={es}
            disabledDates={disabledDates}
          />
        </div>
      )}
    </div>
  )
}

export default InputDateRangePicker
