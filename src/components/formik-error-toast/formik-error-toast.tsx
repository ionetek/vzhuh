import { FormikErrors } from 'formik';
import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';

type FormikErrorToastProps = {
  errors: FormikErrors<any>;
};

export const FormikErrorToast: FC<FormikErrorToastProps> = ({ errors }) => {
  useEffect(() => {
    toast.dismiss();
    Object.entries(errors).map(([_, error]) => {
      if (typeof error === 'string') toast.error(error);
    });
  }, [errors]);

  return null;
};
