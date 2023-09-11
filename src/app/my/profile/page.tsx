'use client';
import Link from 'next/link';
import { useRef } from 'react';

import { Screen } from '@/components/animated-screens/components/screen/screen';
import { Button } from '@/components/button/button';
import { FadedBlock } from '@/components/faded-block/faded-block';
import { TopNavigation } from '@/components/top-navigation/top-navigation';

export default function Profile() {
  const profileScreenRef = useRef<HTMLDivElement>(null);
  return (
    <FadedBlock className='container mx-auto'>
      <Screen screenRef={profileScreenRef}>
        <TopNavigation center='Профиль' title='Профиль' screenRef={profileScreenRef} />
        <div className='px-4'>
          <Link href='/login?s'>
            <Button color='secondary' variant='lg'>
              Выйти из аккаунта
            </Button>
          </Link>
        </div>
      </Screen>
    </FadedBlock>
  );
}
