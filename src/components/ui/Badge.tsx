import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'error' | 'info' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  className?: string
}

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
}: BadgeProps) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-1.5 font-semibold rounded-s'

  const variantStyles = {
    primary: 'bg-primary/20 text-primary border border-primary/30',
    success: 'bg-success/20 text-success border border-success/30',
    error: 'bg-error/20 text-error border border-error/30',
    info: 'bg-info/20 text-info border border-info/30',
    secondary: 'bg-secondary/20 text-secondary border border-secondary/30',
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  )
}
