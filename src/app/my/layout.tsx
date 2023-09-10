'use client';

import cn from 'clsx';
import { ReactNode } from 'react';

import { Sidebar } from '@/components/sidebar/sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='grid min-h-screen grid-cols-[1fr] tablet:grid-cols-[320px_1fr]'>
      <Sidebar className='order-2 tablet:order-1' />

      <div className={cn('order-1 overflow-hidden tablet:relative tablet:order-2', 'fixed inset-0')}>{children}</div>
    </div>
  );
}
