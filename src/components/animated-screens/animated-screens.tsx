import { FC, PropsWithChildren } from 'react';

export const AnimatedScreens: FC<PropsWithChildren> = ({ children }) => {
  return <div className='overflow-hidden'>{children}</div>;
};
