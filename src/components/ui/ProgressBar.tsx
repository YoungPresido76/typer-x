interface ProgressBarProps {
  progress: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'success' | 'error' | 'info'
  showLabel?: boolean
  animated?: boolean
}

export const ProgressBar = ({
  progress,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  animated = true,
}: ProgressBarProps) => {
  const percentage = Math.min((progress / max) * 100, 100)

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-3',
    lg: 'h-4',
  }

  const variantStyles = {
    primary: 'bg-primary',
    success: 'bg-success',
    error: 'bg-error',
    info: 'bg-info',
  }

  return (
    <div className="w-full">
      <div className={`w-full bg-raised rounded-s overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`h-full ${variantStyles[variant]} rounded-s transition-smooth ${
            animated ? 'duration-500' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-gray-400">
          {progress} / {max} ({Math.round(percentage)}%)
        </div>
      )}
    </div>
  )
}
