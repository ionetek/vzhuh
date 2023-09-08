import { useRouter, useSearchParams } from 'next/navigation';

import { FadedBlock } from '@/components/faded-block/faded-block';
import { NavBack } from '@/components/top-navigation/components/nav-back/nav-back';
import { TopNavigation } from '@/components/top-navigation/top-navigation';

export const Order = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  return (
    <FadedBlock className='container mx-auto'>
      <TopNavigation
        center={`Заказ ${orderId}`}
        left={<NavBack onClick={() => router.push('/my/orders', { scroll: false })} />}
        right='right'
        title={`Заказ ${orderId}`}
      />
      <div>
        <a onClick={() => router.push('/my/orders', { scroll: false })}>Screen 0</a>
      </div>
      <div>
        <a onClick={() => router.push('/my/orders?orderId=111', { scroll: false })}>Screen 1</a>
      </div>

      <p className='p-4'>Информация о заказе</p>
    </FadedBlock>
  );
};
