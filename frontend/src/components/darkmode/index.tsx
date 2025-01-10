import { FaCloudMoon, FaCloudSun } from 'react-icons/fa6'
import useDarkMode from '../../hooks/useDarkMode'

function DarkMode() {
  const [darkMode, setDarkMode] = useDarkMode()

  return (
    <button
      className={`
        w-14
        h-6
        hover:cursor-pointer 
        font-medium 
        bg-gradient-to-r from-[#0f172a] to-[#485d7a]
        dark:bg-gradient-to-r dark:from-[#FAF089] dark:to-[#d69e2e]
        dark:transition 
        dark:duration-200 dark:ease-in 
        dark:text-gray-100
        text-white 
        px-2 
        py-1
        rounded-2xl 
        flex items-center 
        justify-between 
        z-50 
        tracking-wider
        shadow-md`}
      onClick={() => setDarkMode(!darkMode)}
    >
      {!darkMode ? (
        <FaCloudMoon className="text-[#B3C6E5] text-md" />
      ) : (
        <>
          <span className="flex-grow"></span>
          <FaCloudSun className="text-[#F6E05E] text-md" />
        </>
      )}
    </button>
  )
}

export default DarkMode
