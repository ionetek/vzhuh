import cn from 'clsx';
import { FC } from 'react';

type Props = {
  content?: string;
  className?: string;
};

export const Counter: FC<Props> = ({ content, className }) => {
  return <div className={cn('absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-600', className)}>{content}</div>;
};
