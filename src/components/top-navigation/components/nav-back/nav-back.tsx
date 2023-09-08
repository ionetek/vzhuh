import { FC } from 'react';

import IconBack from '/public/icons/back.svg';
type Props = {
  onClick: () => void;
};
export const NavBack: FC<Props> = ({ onClick }) => {
  return (
    <div onClick={() => onClick?.()} className='cursor-pointer'>
      <IconBack />
    </div>
  );
};
