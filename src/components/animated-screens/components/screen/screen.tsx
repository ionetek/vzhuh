import cn from 'clsx';
import { FC, PropsWithChildren, RefObject } from 'react';
import { useSwipeable } from 'react-swipeable';

type Props = {
  id?: number;
  activeScreenId?: number;
  screenRef?: RefObject<HTMLDivElement>;
  onSwipeRight?: () => void;
};

export const Screen: FC<PropsWithChildren<Props>> = ({
  children,
  id = 0,
  activeScreenId = 0,
  screenRef,
  onSwipeRight,
}) => {
  const active = id === activeScreenId;
  const hiddenPrev = activeScreenId > id;
  const hiddenNext = activeScreenId < id;

  const swipeHandlers = useSwipeable({
    onSwipedRight: (eventData) => {
      if (eventData.absX > 50) {
        onSwipeRight?.();
      }
    },
  });

  const swipeDetectionProps = onSwipeRight ? { ...swipeHandlers } : {};

  return (
    <div
      className={cn(
        'absolute z-0 h-full w-full overflow-y-scroll bg-white pb-16 transition-transform !duration-500 ease-linear transition-transform-opacity',
        'pb-20 tablet:translate-x-0',
        {
          //Mobile & Tablet
          'z-10 !duration-300': active,

          //Mobile
          'translate-x-0 shadow-2xl ': active,
          '-translate-x-full': hiddenPrev,
          'translate-x-full': hiddenNext,

          //Tablet
          'shadow-none tablet:opacity-100': active,
          'tablet:opacity-0': hiddenPrev || hiddenNext,
        }
      )}
      ref={screenRef}
    >
      <div {...swipeDetectionProps} className='min-h-full'>
        {children}
      </div>
    </div>
  );
};
