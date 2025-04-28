import { default as React, CSSProperties, forwardRef } from 'react';
import clsx from 'clsx';

export type TypographyProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'success' | 'danger' | 'accent' | 'white' | 'black';
  type: 'display' | 'massiveTitle' | 'title' | 'cardtitle' | 'subtitle' | 'body' | 'caption' | 'button' | 'overline' | 'link';
  className?: string;
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'highlight' | 'danger' | 'accent';
  weight?: string;
  styles?: CSSProperties;
  visibleOn?: 'mobile-only' | 'desktop-only' | 'all';
  id?: string;
  italic?: boolean;
  uppercase?: boolean;
};

const variantClasses: Record<NonNullable<TypographyProps['variant']>, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-midBlue',
  white: 'text-white',
  black: 'text-black',
  muted: 'text-gray-500',
  success: 'text-green-500 px-1',
  danger: 'text-red-600 font-semibold',
  accent: 'text-accent',
};

const typeClasses: Record<TypographyProps['type'], string> = {  
  massiveTitle: 'lg:text-9xl xs:text-5xl font-bold tracking-tight leading-none',
  display: 'lg:text-5xl xs:text-2xl font-bold tracking-tighter leading-none',
  title: 'lg:text-3xl xs:text-xl font-semibold leading-snug',
  cardtitle: 'lg:text-2xl xs:text-xl font-semibold leading-snug',
  subtitle: 'lg:text-lg xs:text-base font-light leading-relaxed',
  body: 'lg:text-base xs:text-sm font-normal leading-relaxed',
  caption: 'lg:text-sm xs:text-xs leading-snug',
  button: 'lg:text-sm xs:text-xs uppercase tracking-wide font-semibold leading-none',
  overline: 'lg:text-xs xs:text-[0.625rem] uppercase tracking-widest font-medium',
  link: 'lg:text-base xs:text-sm underline font-medium hover:text-blue-800 transition-colors duration-200',
};

const colorClasses: Record<NonNullable<TypographyProps['color']>, string> = {
  primary: 'text-darkBlue',
  secondary: 'text-white',
  tertiary: 'text-midBlue',
  muted: 'text-gray-400',
  highlight: 'bg-yellow-100 text-yellow-800 px-1',
  danger: 'text-red-600 font-semibold',
  accent: 'text-accent',
};

const visibleOnClasses: Record<
  NonNullable<TypographyProps['visibleOn']>,
  string
> = {
  'mobile-only': 'md:hidden flex',
  'desktop-only': 'hidden md:flex',
  all: 'flex',
};

const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    {
      variant,
      type,
      className = '',
      children,
      color,
      weight,
      styles,
      id,
      visibleOn = 'all',
      italic,
      uppercase,
    },
    ref
  ) => {
    return (
      <p
        id={id}
        ref={ref}
        className={clsx(
          variant && variantClasses[variant],
          typeClasses[type],
          color && colorClasses[color],
          visibleOnClasses[visibleOn],
          className,
          italic ? 'italic' : '',
          uppercase ? 'uppercase': ''
        )}
        style={{ color, fontWeight: weight, ...styles }}
      >
        {children}
      </p>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;
