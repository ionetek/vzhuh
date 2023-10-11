import { Card, Radio, RadioGroup } from '@nextui-org/react';
import { useFormikContext } from 'formik';
import { FC } from 'react';

import { FilterOrdersValues } from '@/types/orders';

export const Filters: FC = () => {
  const formik = useFormikContext<FilterOrdersValues>();

  return (
    <div className='flex flex-col gap-4'>
      <Card className='p-4' shadow='sm'>
        <RadioGroup
          label='Статус'
          defaultValue={formik.values.status}
          onChange={(e) => {
            formik.setFieldValue('status', e.currentTarget.value);
          }}
        >
          <Radio value='all'>Любой</Radio>
          <Radio value='waiting'>Ожидание</Radio>
          <Radio value='in_progress'>Комплектуется</Radio>
          <Radio value='delivering'>Доставляется</Radio>
          <Radio value='delivered'>Доставлен</Radio>
          <Radio value='canceled'>Отменен</Radio>
        </RadioGroup>
      </Card>

      <Card className='p-4' shadow='sm'>
        <RadioGroup label='Площадка' defaultValue='all'>
          <Radio value='all'>Любая</Radio>
          <Radio value='waiting'>Ozon</Radio>
          <Radio value='in_progress'>Собственный сайт</Radio>
        </RadioGroup>
      </Card>
    </div>
  );
};
