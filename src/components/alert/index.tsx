import { useEffect, useState } from 'react'
import { Alert } from '../../interfaces/types'

export function useAlertModal() {
  const [alertProps, setAlertProps] = useState<Alert | null>(null)
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    if (alertProps) {
      setVisible(true)
    } else {
      setVisible(false)
    }
    const timer = setTimeout(
      () => setVisible(false),
      alertProps?.duration ?? 3000
    )
    return () => clearTimeout(timer)
  }, [alertProps])

  const showAlert = (alert: Alert) => {
    setAlertProps(alert)
  }

  const config: any = {
    success: {
      borderColor: 'border-green-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      iconColor: 'text-green-400',
      icon: (
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      ),
    },
    error: {
      borderColor: 'border-red-500',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      iconColor: 'text-red-400',
      icon: (
        <path
          fillRule="evenodd"
          d="M18 10A8 8 0 1110 2a8 8 0 018 8zm-9-3a1 1 0 012 0v3a1 1 0 01-2 0V7zm0 6a1 1 0 102 0 1 1 0 00-2 0z"
          clipRule="evenodd"
        />
      ),
    },
  }

  const { borderColor, bgColor, textColor, iconColor, icon } =
    config[alertProps?.type ?? 'error']

  const component = (
    <>
      {visible ? (
        <div className="fixed top-4 right-4 z-[9999]">
          <div
            className={`p-4 border-l-4 ${borderColor} rounded-r-xl ${bgColor}`}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className={`w-5 h-5 ${iconColor}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {icon}
                </svg>
              </div>
              <div className="ml-3">
                <p className={`text-sm ${textColor}`}>{alertProps?.message}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )

  return { component, showAlert }
}
