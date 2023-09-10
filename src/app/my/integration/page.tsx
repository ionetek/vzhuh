'use client';

import { useRef } from 'react';

import OzonLogo from '/public/logos/ozon.svg';
import SberLogo from '/public/logos/sber.svg';
import WBLogo from '/public/logos/wildberries.svg';
import YMLogo from '/public/logos/yandex_market.svg';
import { IntegrationPanel } from '@/app/my/integration/components/integration-panel';
import { Screen } from '@/components/animated-screens/components/screen/screen';
import { FadedBlock } from '@/components/faded-block/faded-block';
import { TopNavigation } from '@/components/top-navigation/top-navigation';

export default function Integration() {
  const integrationScreenRef = useRef<HTMLDivElement>(null);
  return (
    <Screen screenRef={integrationScreenRef}>
      <FadedBlock className='container mx-auto'>
        <TopNavigation center='Интеграция' title='Интеграция' screenRef={integrationScreenRef} />
        <div className='grid w-full grid-cols-[1fr] gap-4 px-4 tablet:grid-cols-[1fr_1fr]'>
          <IntegrationPanel
            title='Ozon'
            icon={<OzonLogo />}
            description='Создавайте накладные для СДЭК и Почты России всего в 2
                        клика.'
            isConnected={true}
          />

          <IntegrationPanel
            title='Wildberries'
            icon={<WBLogo />}
            description='Создавайте накладные для СДЭК и Почты России всего в 2
                        клика.'
            isConnected={false}
          />

          <IntegrationPanel
            title='Yandex Market'
            icon={<YMLogo />}
            description='Создавайте накладные для СДЭК и Почты России всего в 2
                        клика.'
            isConnected={false}
          />

          <IntegrationPanel
            title='Сбер Мегамаркет'
            icon={<SberLogo />}
            description='Создавайте накладные для СДЭК и Почты России всего в 2
                        клика.'
            isConnected={false}
          />
        </div>
      </FadedBlock>
    </Screen>
  );
}
