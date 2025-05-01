import React from 'react';
import clsx from 'clsx';

type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';
type Variant = 'primary' | 'secondary' | 'tertiary';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    name: string;
    isError?: boolean;
    errorText?: string;
    size?: Size;
    radius?: Radius;
    variant?: Variant;
    required?: boolean;
    maxLength?: number;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      isError = false,
      errorText,
      size = 'md',
      radius = 'md',
      variant = 'primary',
      required,
      maxLength,
      placeholder,
      onBlur,
      className,
      ...rest
    },
    ref
  ) => {
    
    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    const radiusClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    const variantClasses = {
      primary: 'border-gray-300 focus:ring-red-500 focus:border-indigo-500',
      secondary: 'border-blue-300 focus:ring-blue-500 focus:border-blue-500',
      tertiary: 'border-green-300 focus:ring-green-500 focus:border-green-500',
    };

    return (
      <div className="space-y-1 w-full">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          id={name}
          name={name}
          ref={ref}
          placeholder={placeholder}
          onBlur={onBlur}
          maxLength={maxLength}
          required={required}
          className={clsx(
            'block w-full border text-black !bg-white focus:bg-white focus:outline-none',
            sizeClasses[size],
            radiusClasses[radius],
            variantClasses[variant],
            isError ? 'border-red-500 ring-red-500' : '',
            className
          )}
          {...rest}
        />
        {isError && errorText && (
          <p className="text-sm text-red-600 mt-1">{errorText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
