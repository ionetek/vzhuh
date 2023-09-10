import '@/styles/globals.css';

import cn from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next orders',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ru'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
      <body className={cn(inter.className)}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
