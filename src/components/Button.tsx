import React from 'react';
import clsx from 'clsx';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  icon?: React.ReactNode;
  buttonType?:
    | 'solid'
    | 'outline'
    | 'subtle'
    | 'ghost'
    | 'link'
    | 'icon'
    | 'elevated'    
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  isLoading?: boolean;
  loadingPosition?: 'left' | 'right';
  labelLoading?: string;
  visibleOn?: 'mobile-only' | 'desktop-only' | 'all';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      children,
      startIcon,
      endIcon,
      icon,
      buttonType = 'solid',
      size = 'sm',
      variant = 'primary',
      radius = 'xs',
      isLoading = false,
      loadingPosition = 'right',
      labelLoading = 'Loading...',
      className,
      disabled,
      visibleOn = 'all',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'flex gap-2 items-center justify-center font-medium focus:outline-none transition-all';

    const variantStyles = {
      primary: 'bg-primary border-primary',
      secondary: 'bg-white border',
      tertiary: 'bg-secondary border-amber',
      accent: 'bg-amber border-midBlue',
      info: 'bg-sky-100 border-sky-300',
      success: 'bg-green-500 border-green-700',
      warning: 'bg-yellow-400 border-yellow-600',
      danger: 'bg-red-600 border-red-800',
    };

    const contrastTextColors = {
      primary: 'text-primary',
      secondary: 'text-black',
      tertiary: 'text-white',
      accent: 'text-darkBlue',
      info: 'text-sky-700',
      success: 'text-white',
      warning: 'text-black',
      danger: 'text-red-500',
      default: 'text-black',
    };

    const buttonTypeStyles = {
      solid: `${variantStyles[variant]} ${contrastTextColors[variant]}`,
      outline: `${variantStyles[variant]} ${contrastTextColors[variant]} border text-black`,
      subtle: `${variantStyles[variant]} bg-opacity-50 ${contrastTextColors[variant]}`,
      ghost: `${contrastTextColors[variant]} bg-transparent`,
      link: `${contrastTextColors[variant]} bg-transparent underline p-0 text-midBlue`,
      icon: `p-2 rounded-full ${contrastTextColors[variant]}`,
      elevated: `${variantStyles[variant]} ${contrastTextColors[variant]} lg:shadow-md hover:shadow-lg`,
    };    

    const sizeStyles = {
      xs: 'px-2 py-1 text-xs',
      sm: 'xs:px-2 xs:py-1 xs:text-xs lg:px-3 lg:py-1.5 lg:text-sm',
      md: 'xs:px-3 xs:py-1.5 xs:text-sm lg:px-4 lg:py-2 lg:text-base',
      lg: 'xs:px-4 xs:py-2 xs:text-base lg:px-5 lg:py-3 lg:text-lg',
      xl: 'xs:px-5 xs:py-3 xs:text-lg lg:px-8 lg:py-5 lg:text-xl',
    };

    const radiusStyles = {
      none: 'rounded-none',
      xs: 'rounded-sm',
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    };

    const visibleOnClasses = {
      'mobile-only': 'md:hidden flex',
      'desktop-only': 'hidden md:flex',
      all: 'block',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          buttonTypeStyles[buttonType],
          sizeStyles[size],
          radiusStyles[radius],
          visibleOnClasses[visibleOn],
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && loadingPosition === 'left' && (
          <span className="mr-2 animate-spin">🔄</span>
        )}
        {startIcon && !icon && <span className="mr-2">{startIcon}</span>}
        {icon ? icon : isLoading ? labelLoading : children ?? label}
        {endIcon && !icon && <span className="ml-2">{endIcon}</span>}
        {isLoading && loadingPosition === 'right' && (
          <span className="ml-2 animate-spin">🔄</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
