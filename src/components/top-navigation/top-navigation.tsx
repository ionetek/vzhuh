import cn from 'clsx';
import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
type Props = {
  center?: ReactNode | string;
  left?: ReactNode | string;
  right?: ReactNode | string;
  title?: string;
  screenRef?: RefObject<HTMLDivElement>;
  blurBottomOffset?: number;
};

export const TopNavigation: FC<Props> = ({ center, left, right, title, screenRef, blurBottomOffset = 0 }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const onScroll = () => {
    const titleHeight = titleRef.current?.offsetHeight || 0;

    const scrollPosition = screenRef?.current ? screenRef.current.scrollTop : window.scrollY;

    if (scrollPosition > titleHeight) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    const scrolledElement = screenRef?.current ? screenRef.current : window;

    scrolledElement.addEventListener('scroll', onScroll);
    return () => {
      scrolledElement.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div className='sticky top-0 flex items-center justify-between gap-4'>
        <div
          className={cn('absolute left-0 top-0 -z-10 w-full bg-white', {
            'border-b-[1px] border-solid !bg-white/90 backdrop-blur-md': isScrolled,
          })}
          style={{ height: isScrolled ? `calc(100% + ${blurBottomOffset}px)` : '100%' }}
        ></div>
        <div className='flex min-w-[60px] py-2 pl-4'>
          {left && <div>{left}</div>}
          <div
            className={cn(
              'hidden truncate whitespace-nowrap font-bold opacity-0 transition-opacity',
              'text-2xl desktop:block',
              isScrolled && 'opacity-100'
            )}
          >
            {center}
          </div>
        </div>
        <div
          className={cn(
            'block truncate whitespace-nowrap p-2 font-bold opacity-0 transition-opacity desktop:hidden',
            isScrolled && 'opacity-100'
          )}
        >
          {center}
        </div>
        <div className='flex min-w-[60px] justify-end py-2 pr-4'>{right}</div>
      </div>
      <h1 className='p-4 text-3xl font-bold' ref={titleRef}>
        {title}
      </h1>
    </>
  );
};
