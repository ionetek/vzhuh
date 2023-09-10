import { Button } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { FadedBlock } from '@/components/faded-block/faded-block';
import { FormikErrorToast } from '@/components/formik-error-toast/formik-error-toast';
import { Input } from '@/components/input/input';

enum STEPS {
  EMAIL,
  CODE_CONFIRMATION,
  PASSWORD_CONFIRMATION,
}

export const LoginForm = () => {
  const [step, setStep] = useState(STEPS.EMAIL);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      confirmationCode: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Неверный email').required('Введите email'),
    }),
    onSubmit: () => {
      setStep(STEPS.CODE_CONFIRMATION);
    },
    validateOnChange: false,
    isInitialValid: false,
  });

  const validateCode = (code: string) => {
    if (code === '1996') {
      router.push('/my/orders');
    } else {
      toast.dismiss();
      toast.error('Неверный код');
    }
  };

  const onConfirmationCodeChange = (e: FormEvent<HTMLInputElement>) => {
    const code = e.currentTarget.value;
    formik.setFieldValue('confirmationCode', code.slice(0, 4));

    if (code.length === 4) validateCode(code);
  };

  const changeEmail = () => {
    formik.setFieldValue('confirmationCode', '');
    setStep(STEPS.EMAIL);
  };

  const resendCode = () => {
    toast.success('Новый код отправлен');
  };

  return (
    <div>
      {step === STEPS.EMAIL && (
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

              <Button size='lg' color='primary' radius='md' fullWidth type='submit'>
                Продолжить
              </Button>
            </div>
          </form>
        </FadedBlock>
      )}

      {step === STEPS.CODE_CONFIRMATION && (
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
      )}
    </div>
  );
};
