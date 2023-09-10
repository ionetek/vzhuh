import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { ConfirmationCodeInput } from '@/components/login-form/components/confirmation-code-input/confirmation-code-input';
import { EmailInput } from '@/components/login-form/components/email-input/email-input';
import { LoginFormikValues } from '@/types/login';

enum STEPS {
  EMAIL,
  CODE_CONFIRMATION,
  PASSWORD_CONFIRMATION,
}

export const LoginForm = () => {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<LoginFormikValues>({
    initialValues: {
      email: '',
      confirmationCode: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Неверный email').required('Введите email'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      await fetch('/api/login', {
        method: 'post',
        body: JSON.stringify({ email: values.email }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 'CONFIRM_EMAIL') {
            setStep(STEPS.CODE_CONFIRMATION);
          } else {
            toast.error(res.message);
          }

          setIsLoading(false);
        })
        .catch(() => {
          toast.error('Ошибка соединения');
        });
    },
    validateOnChange: false,
    isInitialValid: false,
  });

  const onNavigateToEmail = () => {
    setStep(STEPS.EMAIL);
  };

  return (
    <FormikProvider value={formik}>
      {/*Ввод email*/}
      {step === STEPS.EMAIL && <EmailInput isLoading={isLoading} />}

      {/*Ввод кода подтвержения*/}
      {step === STEPS.CODE_CONFIRMATION && <ConfirmationCodeInput onNavigateToEmail={onNavigateToEmail} />}
    </FormikProvider>
  );
};
