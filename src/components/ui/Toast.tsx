import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose?: () => void
}

export const Toast = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor = {
    success: 'bg-success',
    error: 'bg-error',
    info: 'bg-info',
    warning: 'bg-[#F59E0B]',
  }

  return (
    <div
      className={`fixed bottom-6 right-6 ${bgColor[type]} text-white px-6 py-3 rounded-l shadow-level-4 animate-slide-up`}
    >
      {message}
    </div>
  )
}
