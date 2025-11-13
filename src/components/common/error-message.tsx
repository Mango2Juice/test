// /src/components/common/error-message.tsx

'use client'

import type React from 'react'

interface ErrorMessageProps {
  message: string | undefined
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null
  }

  return <p className='text-sm font-medium text-destructive'>{message}</p>
}
