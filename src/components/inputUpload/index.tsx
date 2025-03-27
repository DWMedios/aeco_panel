import { Camera } from '@phosphor-icons/react'
import { useState } from 'react'

interface Props {
  title: string
  onImageUpload: (file: File) => void
}
const InputUpload = ({ title, onImageUpload }: Props) => {
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      onImageUpload(file)
    }
  }

  return (
    <>
      <span className="text-2xl">{title}</span>
      <div className="flex gap-4 rounded-xl mt-2 p-2 flex-wrap">
        <label className="relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-gray-400 cursor-pointer bg-gray-100 dark:bg-gray-700 hover:border-gray-600">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <>
              <span className="text-gray-500 dark:text-gray-300 text-sm text-center">
                Logo
              </span>
            </>
          )}
          <Camera size={40} className="absolute mt-20 ml-14" />

          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </label>
        <div className="rounded-lg p-4 bg-gray-100 w-fit text-gray-700">
          <p className="font-semibold">
            <span className="font-normal">Formato</span> JPG
          </p>
          <p className="font-semibold">
            <span className="font-normal">Dimensiones</span> 250 x 250px
          </p>
          <p className="font-semibold">
            <span className="font-normal">Peso máximo</span> 2mb
          </p>
        </div>
      </div>
    </>
  )
}

export default InputUpload
