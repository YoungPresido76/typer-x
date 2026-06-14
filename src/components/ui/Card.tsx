import { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'raised' | 'elevated'
  padding?: boolean
}

export const Card = ({
  children,
  variant = 'default',
  padding = true,
  className = '',
  ...props
}: CardProps) => {
  const baseStyles = 'rounded-l transition-smooth'

  const variantStyles = {
    default: 'bg-surface border border-border shadow-level-1',
    raised: 'bg-raised border border-border shadow-level-2',
    elevated: 'bg-raised border border-border shadow-level-3',
  }

  const paddingStyle = padding ? 'p-l' : ''

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
