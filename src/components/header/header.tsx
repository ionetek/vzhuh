'use client';
import cn from 'clsx';
import Link from 'next/link';
import { FC, ReactNode, useEffect, useState } from 'react';

import { Title } from '@/components/title/title';

type Props = {
  title?: string;

  iconLeft?: ReactNode;
  iconLeftAction?: () => void;
  iconLeftHref?: string;

  iconRight?: ReactNode;
  iconRightAction?: () => void;
  iconRightHref?: string;

  className?: string;
};

export const Header: FC<Props> = ({
  title = '',

  iconLeft,
  iconRight,
  iconLeftHref,

  iconLeftAction,
  iconRightAction,
  iconRightHref,
  className,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const iconClass = cn('h-10 w-10 flex items-center justify-center hover:bg-slate-100 rounded-full cursor-pointer', {
    'shadow-md bg-white': isScrolled,
  });

  const onScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <div
      className={cn('sticky top-0 flex w-full flex-col gap-4 px-5 pt-5 tablet:px-[60px] tablet:pt-[60px]', className)}
    >
      <div className='flex w-full justify-between'>
        {/*Иконка слева*/}
        <div>
          {iconLeft && (
            <>
              {iconLeftHref ? (
                <Link href={iconLeftHref} className={iconClass}>
                  {iconLeft}
                </Link>
              ) : (
                <div onClick={() => iconLeftAction?.()} className={iconClass}>
                  {iconLeft}
                </div>
              )}
            </>
          )}
        </div>

        {/*Иконка справа*/}
        <div>
          {iconRight && (
            <>
              {iconRightHref ? (
                <Link href={iconRightHref} className={iconClass}>
                  {iconRight}
                </Link>
              ) : (
                <div onClick={() => iconRightAction?.()} className={iconClass}>
                  {iconRight}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/*Заголовок*/}
      {title && (
        <div className='px-10'>
          <Title>{title}</Title>
        </div>
      )}
    </div>
  );
};
