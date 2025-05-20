import { useEffect, useState } from 'react'
import { Download, Phone } from '@phosphor-icons/react'
import { decompressFromEncodedURIComponent } from 'lz-string'
import { useLocation } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { QRCodeCanvas } from 'qrcode.react'

const Ticket = () => {
  const location = useLocation()
  const [ticket, setTicket] = useState<any>(null)
  const [url, setUrl] = useState<any>(null)

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const compressed = query.get('data')
    const fullUrl = `${window.location.origin}${
      location.pathname
    }?${query.toString()}`
    setUrl(fullUrl)
    if (compressed) {
      try {
        const jsonString = decompressFromEncodedURIComponent(compressed)
        const parsed = JSON.parse(jsonString)
        setTicket(parsed)
      } catch (error) {
        console.error('Error descomprimiendo:', error)
      }
    }
  }, [location.search])

  const downloadTicket = async () => {
    const ticketElement = document.getElementById('ticket')
    if (!ticketElement) return

    const canvas = await html2canvas(ticketElement, {
      scale: 2, // mejor calidad
      useCORS: true,
    })
    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'ticket.png'
    link.click()
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center bg-white p-4">
        <button
          onClick={downloadTicket}
          className="flex items-center gap-2 text-white bg-black px-4 py-2 rounded-lg"
        >
          <Download size={20} /> Descargar
        </button>
      </div>

      <div className="flex items-center justify-center bg-white mt-28">
        <div
          id="ticket"
          className="border-t-[10px] border-dashed border-black w-full max-w-[600px] z-10"
        >
          <div className="border-b-[10px] border-l-[10px] border-r-[10px] border-solid border-black shadow-2xl rounded-lg flex flex-col justify-center items-center text-center bg-white p-4">
            <span className="text-2xl md:text-4xl tracking-wider font-bold">
              Folio
            </span>
            <span className="font-semibold text-2xl md:text-2xl tracking-wider">
              aeco20240626A21
            </span>
            <QRCodeCanvas
              value={url}
              size={200}
              level={'M'}
              includeMargin={true}
              marginSize={1}
              fgColor={'#000000'}
              title={'QR Code Ayuntaeco'}
              bgColor={'#FFF'}
            />
            <ul className="text-lg ">
              {ticket?.packagings.map((p: any, i: any) => (
                <li key={i}>
                  <span>{`${p.name} - ${p.quantity}`}</span>
                </li>
              ))}
            </ul>

            <span className="p-2 w-full md:w-[502px] leading-7 text-xl">
              Para dudas y aclaraciones por operaciones en las máquinas
              recicladoras, comuníquese de Lunes a Viernes de 8:00 a 18:00 hrs
              al
              <div className="flex justify-center gap-2">
                <Phone size={25} />
                999 888 7777
              </div>
            </span>
            <span className="text-[#F10404] text-xl font-bold mt-4">
              {ticket?.date}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ticket
