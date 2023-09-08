'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '@/components/button/button';
import { Title } from '@/components/title/title';
import { NAVIGATION_ANIMATION } from '@/constants/navigation';

export default function Home() {
  return (
    <motion.div
      variants={NAVIGATION_ANIMATION}
      initial='hidden'
      animate='show'
      className='flex h-screen items-center justify-center'
    >
      <div className='flex max-w-[600px] flex-col gap-8 text-center'>
        <Title align='center'>
          Создавайте накладные для маркетплейсов <br />
          всего в 2 клика
        </Title>
        <Link href='/login'>
          <Button variant='xl'>Начать пользоваться</Button>
        </Link>
      </div>
    </motion.div>
  );
}
