'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

import { AnimatedScreens } from '@/components/animated-screens/animated-screens';
import { Screen } from '@/components/animated-screens/components/screen/screen';
import { Order } from '@/routes/order/order';
import { Orders } from '@/routes/orders/orders';

const OrdersPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');
  const createConsignment = searchParams.get('createConsignment');

  let activeScreenId;

  switch (true) {
    case !!orderId && !createConsignment:
      activeScreenId = 1;
      break;
    default:
      activeScreenId = 0;
  }

  const ordersScreenRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatedScreens>
      <Screen id={0} activeScreenId={activeScreenId} screenRef={ordersScreenRef}>
        <Orders screenRef={ordersScreenRef} />
      </Screen>
      <Screen id={1} activeScreenId={activeScreenId} onSwipeRight={() => router.back()}>
        <Order />
      </Screen>
    </AnimatedScreens>
  );
};

export default OrdersPage;
