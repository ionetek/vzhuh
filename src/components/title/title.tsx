import cn from 'clsx';
import { FC, PropsWithChildren } from 'react';

type Props = {
  variant?: 'lg' | 'xl' | '2xl';
  align?: 'left' | 'right' | 'center';
};
export const Title: FC<PropsWithChildren<Props>> = ({ children, variant = '2xl', align = 'left' }) => {
  return (
    <div
      className={cn('font-medium', {
        //Font sizes
        'text-2xl': variant === '2xl',
        'text-xl': variant === 'xl',
        'text-lg': variant === 'lg',

        //Align
        'text-left': align === 'left',
        'text-right': align === 'right',
        'text-center': align === 'center',
      })}
    >
      {children}
    </div>
  );
};
