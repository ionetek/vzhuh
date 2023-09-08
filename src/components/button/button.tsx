'use client';
import cn from 'clsx';
import { FC, PropsWithChildren } from 'react';

type Props = {
  variant?: 'm' | 'lg' | 'xl';
  onClick?: () => void;
  color?: 'primary' | 'secondary';
  className?: string;
};

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  variant = 'lg',
  color = 'primary',
  className,
}) => {
  return (
    <button
      onClick={() => onClick?.()}
      className={cn(className, {
        //Size
        'h-9 rounded-xl px-3 text-sm': variant === 'm',
        'h-11 rounded-2xl px-4 text-base': variant === 'lg',
        'h-14 rounded-3xl px-6 text-lg': variant === 'xl',

        //Color
        'bg-blue-600 text-white hover:bg-blue-700': color === 'primary',
        'bg-blue-50 text-blue-600 hover:bg-blue-100': color === 'secondary',
      })}
    >
      {children}
    </button>
  );
};
