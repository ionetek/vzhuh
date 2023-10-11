import { Button } from '@nextui-org/react';
import { FormikProvider, useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, RefObject, useRef, useState } from 'react';

import CalendarIcon from '/public/icons/calendar-icon.svg';
import FilterIcon from '/public/icons/filter-icon.svg';
import { BottomSheet } from '@/components/bottom-sheet/bottom-sheet';
import { Calendar } from '@/components/calendar/calendar';
import { Counter } from '@/components/counter/counter';
import { FadedBlock } from '@/components/faded-block/faded-block';
import { Filters } from '@/components/filters/filters';
import { Input } from '@/components/input/input';
import { OrderItem } from '@/components/order-item/order-item';
import { TopNavigation } from '@/components/top-navigation/top-navigation';
import { ORDER_LIST } from '@/constants/mock';
import { datesFromQuery } from '@/helpers/query-params/dates/dates';
import { FilterOrdersQuery, FilterOrdersValues, SOURCE, STATUS } from '@/types/orders';

type Props = {
  screenRef: RefObject<HTMLDivElement>;
};

const valuesToQuery = (values: FilterOrdersValues) => {
  const cleanValues: FilterOrdersQuery = {};

  if (values.status !== STATUS.ALL) cleanValues.status = values.status;
  if (values.source !== SOURCE.ALL) cleanValues.source = values.source;

  if (values.dates.length) cleanValues.dates = values.dates.join(',');

  return cleanValues;
};

export const Orders: FC<Props> = ({ screenRef }) => {
  const bottomSheetCalendarRef = useRef<HTMLDivElement>(null);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const dates = datesFromQuery(searchParams.get('dates'));

  const initialFilterValues = {
    status: searchParams.get('status') || STATUS.ALL,
    source: searchParams.get('source') || SOURCE.ALL,
    dates,
  } as FilterOrdersValues;

  const formik = useFormik<FilterOrdersValues>({
    initialValues: initialFilterValues,
    onSubmit: (formikValues) => {
      const qs = '?' + decodeURIComponent(new URLSearchParams(valuesToQuery(formikValues)).toString());
      router.push('/my/orders/' + qs);
    },
  });

  return (
    <FormikProvider value={formik}>
      <FadedBlock className='container mx-auto'>
        <TopNavigation
          center='Мои заказы'
          right='right'
          title='Мои заказы'
          screenRef={screenRef}
          blurBottomOffset={80}
        />
        <div className='sticky top-10 grid grid-cols-[1fr_48px_48px] gap-4 p-4 desktop:top-12'>
          <Input type='text' placeholder='Поиск заказа' variant='lg' onChange={() => {}} />

          <div className='relative'>
            <Button
              size='lg'
              variant='light'
              className='h-12 w-12 !min-w-0 px-0 shadow'
              color='primary'
              onClick={() => {
                setIsCalendarVisible(true);
              }}
            >
              <CalendarIcon />
            </Button>
            {!!dates.length && <Counter />}
          </div>

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
        <BottomSheet
          isOpen={isFiltersVisible}
          onClose={() => {
            setIsFiltersVisible(false);

            //Сбрасываем значения выбранные в модалке
            formik.setValues((state) => {
              return { ...state, status: initialFilterValues.status, source: initialFilterValues.source };
            });
          }}
          title='Фильтр заказов'
          footer={
            <Button
              size='lg'
              color='primary'
              radius='md'
              fullWidth
              onClick={() => {
                setIsFiltersVisible(false);
                formik.submitForm();
              }}
            >
              Применить
            </Button>
          }
        >
          <Filters />
        </BottomSheet>

        <BottomSheet
          isOpen={isCalendarVisible}
          onClose={() => {
            setIsCalendarVisible(false);

            //Сбрасываем значения выбранные в модалке
            formik.setValues((state) => {
              return { ...state, dates: initialFilterValues.dates };
            });
          }}
          title='Календарь'
          contentRef={bottomSheetCalendarRef}
          footer={
            <Button
              size='lg'
              color='primary'
              radius='md'
              fullWidth
              onClick={() => {
                setIsCalendarVisible(false);
                formik.submitForm();
              }}
            >
              Применить
            </Button>
          }
        >
          <Calendar
            dates={formik.values.dates}
            onDateChange={(dates) => formik.setFieldValue('dates', dates)}
            isScrollToActualDate={isCalendarVisible}
            scrolledElementRef={bottomSheetCalendarRef}
          />
        </BottomSheet>
      </FadedBlock>
    </FormikProvider>
  );
};
