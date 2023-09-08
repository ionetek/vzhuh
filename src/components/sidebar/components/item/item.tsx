import cn from 'clsx';
import Link from 'next/link';
import { FC, PropsWithChildren, ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  active?: boolean;
  href: string;
};
export const Item: FC<PropsWithChildren<Props>> = ({ children, icon, active = false, href }) => {
  return (
    <Link
      className={cn(
        'flex w-full cursor-pointer flex-col items-center rounded-3xl tablet:flex-row tablet:gap-4',
        'text-slate-400 [&>path]:fill-slate-400',
        'tablet:px-8 tablet:py-6',
        'tablet:hover:bg-slate-50',
        {
          '!text-blue-600 [&>path]:!fill-blue-600': active,
        }
      )}
      href={href}
    >
      {icon}
      <span className='text-sm tablet:text-lg'>{children}</span>
    </Link>
  );
};
