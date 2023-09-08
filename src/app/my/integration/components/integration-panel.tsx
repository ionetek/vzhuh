import { FC, ReactNode } from 'react';

import { Badge } from '@/components/badge/badge';
import { Button } from '@/components/button/button';
import { Panel } from '@/components/panel/panel';

type Props = {
  title: string;
  icon: ReactNode;
  description: string;
  isConnected: boolean;
};

export const IntegrationPanel: FC<Props> = ({ title, icon, description, isConnected }) => {
  return (
    <Panel>
      <div className='grid grid-cols-[40px_1fr] gap-4'>
        {icon}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <span className='whitespace-nowrap text-base font-medium'>{title}</span>
            {isConnected && <Badge color='success'>Подключено</Badge>}
          </div>
          <div className='text-sm text-slate-500'>{description}</div>

          <div className='flex justify-end'>
            {!isConnected && (
              <Button variant='m' color='secondary' className='w-[140px]'>
                Подключить
              </Button>
            )}

            {isConnected && (
              <Button variant='m' color='secondary' className='w-[140px]'>
                Настройка
              </Button>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
};
