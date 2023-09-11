'use client';

import Link from 'next/link';
import { FC } from 'react';

import OzonLogo from '/public/logos/ozon.svg';
import { OrderDataShort } from '@/types/order';

type Props = {
  order: OrderDataShort;
};

export const OrderItem: FC<Props> = ({ order }) => {
  return (
    <Link
      className='grid w-full cursor-pointer grid-cols-[40px_1fr_80px] gap-x-4 gap-y-2 p-4 desktop:rounded-3xl desktop:hover:bg-slate-50'
      href={`/my/orders?orderId=${order.id}`}
    >
      <OzonLogo className='row-span-2' />

      <div className='flex flex-col gap-0'>
        <span className='whitespace-nowrap text-base font-medium'>{order.id}</span>

        <div className='max-w-[200px] truncate text-sm text-slate-400'>{order.customer}</div>
      </div>

      <div className='flex flex-col items-end'>
        <span className='whitespace-nowrap text-base font-medium'>{order.total} ₽</span>
      </div>
    </Link>
  );
};
