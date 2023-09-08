import cn from 'clsx';
import { FC, PropsWithChildren } from 'react';

type Props = {
  color?: 'success' | 'primary' | 'secondary';
};
export const Badge: FC<PropsWithChildren<Props>> = ({ children, color = 'secondary' }) => {
  return (
    <div
      className={cn('h-5 rounded-md  px-3 text-sm', {
        'bg-slate-200 text-slate-500': color === 'secondary',
        'bg-lime-500 text-white': color === 'success',
        'bg-blue-50 text-blue-600': color === 'primary',
      })}
    >
      {children}
    </div>
  );
};
