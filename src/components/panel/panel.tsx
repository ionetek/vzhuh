import cn from 'clsx';
import { FC, PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export const Panel: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return <div className={cn('cursor-pointer rounded-3xl border-[1px] border-solid p-4', className)}>{children}</div>;
};
