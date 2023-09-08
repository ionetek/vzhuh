'use client';

import cn from 'clsx';
import { motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

import { NAVIGATION_ANIMATION } from '@/constants/navigation';

type Props = {
  className?: string;
};
export const FadedBlock: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <motion.div variants={NAVIGATION_ANIMATION} initial='hidden' animate='show' className={cn(className)}>
      {children}
    </motion.div>
  );
};
