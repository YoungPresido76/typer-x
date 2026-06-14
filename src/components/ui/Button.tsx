import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'error'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  icon?: ReactNode
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'font-semibold rounded-l transition-smooth flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-[#E66A0A]',
    secondary: 'bg-secondary text-base hover:bg-[#F5A337]',
    ghost: 'bg-transparent text-primary hover:bg-surface',
    success: 'bg-success text-white hover:bg-[#1ABC4F]',
    error: 'bg-error text-white hover:bg-[#DF3333]',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {loading ? 'Loading...' : children}
    </button>
  )
}
