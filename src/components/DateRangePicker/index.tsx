import React, { useState, useEffect } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { es } from 'date-fns/locale'
import { formatDate, getFirstAndLastDayOfMonth } from '../../utils/formatDate'

interface Props {
  setDates: (queryString: string) => void
}

const InputDateRangePicker = ({ setDates }: Props) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Establecemos por defecto el primer y último día del mes actual
    const { startDate, endDate } = getFirstAndLastDayOfMonth()
    setSelectionRange({ startDate, endDate, key: 'selection' })
  }, [])

  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection
    setSelectionRange({ startDate, endDate, key: 'selection' })
  }

  useEffect(() => {
    const { startDate, endDate } = selectionRange
    const isRangeSelected =
      startDate && endDate && startDate.getTime() !== endDate.getTime()
    if (isRangeSelected) {
      const queryString = `&startDate=${formatDate(
        startDate
      )}&endDate=${formatDate(endDate)}`
      setDates(queryString)
      setOpen(false)
    }
  }, [selectionRange, setDates])

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
        value={`${selectionRange.startDate.toLocaleDateString(
          'es-ES'
        )} - ${selectionRange.endDate.toLocaleDateString('es-ES')}`}
        onClick={() => setOpen(!open)}
        readOnly
      />
      {open && (
        <div className="absolute z-10 mt-2 -ml-40 bg-white shadow-lg rounded-md p-4">
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            showSelectionPreview={false}
            showDateDisplay={false}
            months={1}
            direction="horizontal"
            locale={es}
          />
        </div>
      )}
    </div>
  )
}

export default InputDateRangePicker
