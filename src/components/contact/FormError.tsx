import React from 'react';
import { AlertCircle } from 'lucide-react';
import { FormError as FormErrorType } from './types';

interface FormErrorProps {
  error: FormErrorType;
}

export default function FormError({ error }: FormErrorProps) {
  return (
    <div className="flex items-center space-x-2 text-red-600 justify-center">
      <AlertCircle className="h-5 w-5" />
      <p className="text-sm">{error.message}</p>
    </div>
  );
}