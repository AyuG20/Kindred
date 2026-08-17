import React from 'react'
import './Input.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...rest }, ref) => {
    const inputId = id ?? `kindred-input-${Math.random().toString(36).slice(2, 10)}`

    return (
      <label className="kindred-input-wrapper" htmlFor={inputId}>
        {label && <span className="kindred-input-label">{label}</span>}
        <input
          ref={ref}
          id={inputId}
          className={`kindred-input ${className}`.trim()}
          {...rest}
        />
        {error && <span className="kindred-input-error">{error}</span>}
      </label>
    )
  },
)

Input.displayName = 'Input'
