import cn from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { useSwipeable } from 'react-swipeable';

import CloseIcon from '/public/icons/close-icon.svg';
import { Portal } from '@/components/ portal/portal';
import { createArray } from '@/helpers/create-array/create-array';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
};

export const BottomSheet: FC<PropsWithChildren<Props>> = ({ children, isOpen, onClose, title }) => {
  const swipeHandlersBg = useSwipeable({
    onSwipedDown: (eventData) => {
      if (eventData.absX > 0) {
        onClose?.();
      }
    },
  });

  const swipeHandlersHeader = useSwipeable({
    onSwipedDown: (eventData) => {
      if (eventData.absX > 0) {
        onClose?.();
      }
    },
  });

  return (
    <Portal>
      <div
        className={cn('pointer-events-none fixed inset-0 bg-black bg-opacity-0 shadow-2xl transition-opacity', {
          '!pointer-events-auto': isOpen,
        })}
        onClick={() => onClose?.()}
        {...swipeHandlersBg}
      />
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 top-20 z-[3000] rounded-t-3xl bg-white shadow-bottom-sheet transition-shadow transition-transform',
          {
            'translate-y-full shadow-none': !isOpen,
          }
        )}
      >
        <div className='grid w-full grid-cols-[24px_1fr_24px] gap-4 border-b-1 p-4' {...swipeHandlersHeader}>
          <div></div>
          <div className='truncate text-center font-bold'>{title}</div>
          <a onClick={() => onClose?.()} className='cursor-pointer'>
            <CloseIcon />
          </a>
        </div>
        <div className='h-[calc(100%_-_56px)] overflow-y-scroll p-4'>
          {children}
          {createArray(30).map((i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolore ducimus earum excepturi iste
              minus neque perferendis porro, praesentium quas quod reiciendis rem, totam voluptas voluptatibus? Atque
              recusandae reprehenderit unde.
            </p>
          ))}
        </div>
      </div>
    </Portal>
  );
};
