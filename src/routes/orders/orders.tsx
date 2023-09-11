import { Button } from '@nextui-org/react';
import { FC, RefObject, useState } from 'react';

import FilterIcon from '/public/icons/filter-icon.svg';
import { BottomSheet } from '@/components/bottom-sheet/bottom-sheet';
import { FadedBlock } from '@/components/faded-block/faded-block';
import { Input } from '@/components/input/input';
import { OrderItem } from '@/components/order-item/order-item';
import { TopNavigation } from '@/components/top-navigation/top-navigation';
import { ORDER_LIST } from '@/constants/mock';

type Props = {
  screenRef: RefObject<HTMLDivElement>;
};

export const Orders: FC<Props> = ({ screenRef }) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  return (
    <FadedBlock className='container mx-auto'>
      <TopNavigation center='Мои заказы' right='right' title='Мои заказы' screenRef={screenRef} blurBottomOffset={80} />
      <div className='sticky top-10 grid grid-cols-[1fr_48px] gap-4 p-4 desktop:top-12'>
        <Input type='text' placeholder='Поиск заказа' variant='lg' onChange={() => {}} />
        <Button
          size='lg'
          variant='light'
          className='!min-w-0 px-0 shadow'
          color='primary'
          onClick={() => {
            setIsFiltersVisible(true);
          }}
        >
          <FilterIcon />
        </Button>
      </div>

      <div>
        {ORDER_LIST.map((order) => (
          <OrderItem order={order} key={order.id} />
        ))}
      </div>
      <BottomSheet isOpen={isFiltersVisible} onClose={() => setIsFiltersVisible(false)} title='Фильтр заказов' />
    </FadedBlock>
  );
};
