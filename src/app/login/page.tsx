'use client';

import Logo from '/public/vzhuh.svg';
import { FadedBlock } from '@/components/faded-block/faded-block';
import { LoginForm } from '@/components/login-form/login-form';

export default function LoginPage() {
  return (
    <div className='fixed inset-0 flex flex-col items-center gap-10 p-4 px-8 tablet:justify-between tablet:p-40'>
      <FadedBlock className='w-full max-w-[400px]'>
        <Logo />
      </FadedBlock>
      <div className='w-full max-w-[400px] translate-y-6'>
        <LoginForm />
      </div>
      <div className='hidden h-32 w-full tablet:block'></div>
    </div>
  );
}
