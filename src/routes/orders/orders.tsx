import { Input } from '@nextui-org/react';
import cn from 'clsx';
import { FC, RefObject } from 'react';

import { FadedBlock } from '@/components/faded-block/faded-block';
import { OrderItem } from '@/components/order-item/order-item';
import { TopNavigation } from '@/components/top-navigation/top-navigation';
import { ORDER_LIST } from '@/constants/mock';

type Props = {
  screenRef: RefObject<HTMLDivElement>;
};

export const Orders: FC<Props> = ({ screenRef }) => {
  return (
    <FadedBlock className='container mx-auto'>
      <TopNavigation center='Мои заказы' right='right' title='Мои заказы' screenRef={screenRef} blurBottomOffset={80} />
      <div className={cn('sticky top-10 p-4 desktop:top-12')}>
        <Input type='text' label='Поиск заказа' className={'[&>div>input]:text-base'} size='sm' />
      </div>

      <div>
        {ORDER_LIST.map((order) => (
          <OrderItem order={order} key={order.id} />
        ))}
      </div>
    </FadedBlock>
  );
};
