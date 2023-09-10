import { Button } from '@nextui-org/react';
import { useFormikContext } from 'formik';
import { FC } from 'react';

import { FadedBlock } from '@/components/faded-block/faded-block';
import { FormikErrorToast } from '@/components/formik-error-toast/formik-error-toast';
import { Input } from '@/components/input/input';
import { Spinner } from '@/components/spinner/spinner';
import { LoginFormikValues } from '@/types/login';

type Props = {
  isLoading: boolean;
};

export const EmailInput: FC<Props> = ({ isLoading }) => {
  const formik = useFormikContext<LoginFormikValues>();
  return (
    <FadedBlock>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex w-full flex-col gap-4'>
          {!formik.isValidating && <FormikErrorToast errors={formik.errors} />}
          <h1 className='text-2xl font-bold'>
            Введите email&nbsp;
            <br />
            для входа&nbsp;или&nbsp;регистрации
          </h1>

          <Input
            type='text'
            placeholder='Email'
            variant='lg'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            autoFocus
            keepFocus
            autoCapitalize='none'
            autoCorrect='off'
          />

          <Button
            size='lg'
            color='primary'
            radius='md'
            fullWidth
            type='submit'
            isLoading={isLoading}
            isDisabled={isLoading}
            spinner={<Spinner />}
          >
            {!isLoading && 'Продолжить'}
          </Button>
        </div>
      </form>
    </FadedBlock>
  );
};
