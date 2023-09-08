import { motion } from 'framer-motion';
import { FC } from 'react';

import IconBack from '/public/icons/back.svg';
import { Button } from '@/components/button/button';
import { Header } from '@/components/header/header';
import { Input } from '@/components/input/input';
import { Title } from '@/components/title/title';
import { NAVIGATION_ANIMATION } from '@/constants/navigation';

export const LoginForm: FC = () => {
  return (
    <>
      <div className='fixed top-0 w-full'>
        <Header iconLeft={<IconBack />} iconLeftHref='/'></Header>
      </div>

      <motion.div
        variants={NAVIGATION_ANIMATION}
        initial='hidden'
        animate='show'
        className='flex w-full max-w-2xl flex-col gap-4 px-10'
      >
        <Title>Зарегистрируйтесь или войдите,&nbsp;введя&nbsp;ваш&nbsp;email</Title>
        <div className='grid grid-cols-[1fr] items-end gap-4 tablet:grid-cols-[1fr_180px]'>
          <Input label='Email' placeholder='Введите ваш email' />

          <Button variant='xl' className='w-full' onClick={() => {}}>
            Продолжить
          </Button>
        </div>
      </motion.div>
    </>
  );
};
