import { Power } from '@phosphor-icons/react'
import { useAuth } from '../../hooks/useAuth'

const CardProfile = () => {
  const { logout } = useAuth()
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-white">
      <div className="flex flex-col items-center bg-slate-950 rounded-2xl">
        <div className="absolute flex-col items-center bg-gray-400 w-full pt-8 text-white h-16 -z-0 rounded-t-2xl"></div>
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg z-10 mt-2"
          src="/images/user_profile.png"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium dark:text-white">
          User Profile
        </h5>
        <span className="text-sm dark:text-gray-400">Admin</span>
        <ul className="my-4 space-y-3 w-full">
          <li>
            <a
              onClick={logout}
              className="cursor-pointer w-full flex items-center p-3 font-bold hover:bg-gray-400 hover:bg-opacity-30
               group hover:shadow"
            >
              <Power size={25} color="white" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Cerrar sesion
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default CardProfile
