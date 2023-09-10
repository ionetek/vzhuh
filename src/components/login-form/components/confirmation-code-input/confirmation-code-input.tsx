import { useFormikContext } from 'formik';
import { useRouter } from 'next/navigation';
import { FC, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { FadedBlock } from '@/components/faded-block/faded-block';
import { Input } from '@/components/input/input';
import { Spinner } from '@/components/spinner/spinner';
import { LoginFormikValues } from '@/types/login';

type Props = {
  onNavigateToEmail: () => void;
};

export const ConfirmationCodeInput: FC<Props> = ({ onNavigateToEmail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormikContext<LoginFormikValues>();
  const router = useRouter();

  const validateCode = async (code: string) => {
    setIsLoading(true);
    const { email } = formik.values;
    toast.dismiss();

    await fetch('/api/login', {
      method: 'post',
      body: JSON.stringify({ email, confirmationCode: code }),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        if (res.status === 'EMAIL_CONFIRMED') {
          router.push('/my/orders');
        } else {
          toast.error(res.message);
        }
      })
      .catch(() => {
        toast.error('Ошибка соединения');
      });

    setIsLoading(false);
  };

  const onConfirmationCodeChange = (e: FormEvent<HTMLInputElement>) => {
    const code = e.currentTarget.value;
    formik.setFieldValue('confirmationCode', code.slice(0, 4));

    if (code.length === 4) validateCode(code);
  };

  const changeEmail = () => {
    formik.setFieldValue('confirmationCode', '');
    onNavigateToEmail();
  };

  const resendCode = () => {
    toast.success('Новый код отправлен');
  };

  return (
    <FadedBlock className='flex w-full flex-col gap-4'>
      <h1 className='text-2xl font-bold'>
        Введите код,&nbsp;
        <br />
        отправленный&nbsp;на&nbsp;email
      </h1>

      <Input
        type='number'
        placeholder='****'
        variant='lg'
        name='confirmationCode'
        value={formik.values.confirmationCode}
        onChange={onConfirmationCodeChange}
        autoFocus
        keepFocus
        pattern='[0-9]*'
        maxLength={4}
        iconRight={
          isLoading && (
            <div className='text-blue-700'>
              <Spinner />
            </div>
          )
        }
      />

      <div className='flex flex-col gap-4 text-xs'>
        <div>
          <p className='text-slate-400'>Отправили код на {formik.values.email}</p>
          <p className='text-slate-400'>Если код не приходит, проверьте папку &quot;Спам&quot;</p>
        </div>
        <div className='flex gap-4'>
          <a className='cursor-pointer text-blue-600' onClick={resendCode}>
            Отправить код повторно
          </a>
          <a className='cursor-pointer text-blue-600' onClick={changeEmail}>
            Изменить email
          </a>
        </div>
      </div>
    </FadedBlock>
  );
};
