'use client';

import cn from 'clsx';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import IntegrationsIcon from '/public/icons/integration.svg';
import OrdersIcon from '/public/icons/orders.svg';
import ProfileIcon from '/public/icons/profile.svg';
import { Item } from '@/components/sidebar/components/item/item';
import { NAVIGATION_ANIMATION } from '@/constants/navigation';

type Props = {
  className?: string;
};
export const Sidebar: FC<Props> = ({ className }) => {
  const pathname = usePathname();
  const isActive = (dir: string) => {
    return pathname.startsWith(dir);
  };
  return (
    <motion.div
      variants={NAVIGATION_ANIMATION}
      initial='hidden'
      animate='show'
      className={cn(
        'flex h-[72px] w-full items-start justify-center border-solid tablet:h-screen tablet:items-center',
        'pt-2 tablet:pt-0',
        'border-t-[1px] tablet:border-r-[1px] tablet:border-t-0',
        'fixed bottom-0 tablet:sticky tablet:bottom-auto tablet:top-0',
        'z-[2000] bg-white/80 backdrop-blur-lg',
        className
      )}
    >
      <div className='flex w-full px-10 tablet:flex-col'>
        <Item icon={<OrdersIcon />} active={isActive('/my/orders')} href='/my/orders'>
          Заказы
        </Item>
        <Item icon={<IntegrationsIcon />} active={isActive('/my/integration')} href='/my/integration'>
          Интеграция
        </Item>
        <Item icon={<ProfileIcon />} active={isActive('/my/profile')} href='/my/profile'>
          Профиль
        </Item>
      </div>
    </motion.div>
  );
};
