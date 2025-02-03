'use client'

import * as React from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input, type InputProps } from '@/components/ui/input'

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const disabled =
      props.value === '' || props.value === undefined || props.disabled

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={`pr-10 ${className}`}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          disabled={disabled}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
