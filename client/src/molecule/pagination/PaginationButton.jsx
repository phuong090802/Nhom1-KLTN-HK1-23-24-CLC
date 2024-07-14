import clsx from 'clsx';
import { ChevronFirst, ChevronLast } from 'lucide-react';
import { useMemo } from 'react';
import MyButton from '../../atom/my-button/MyButton';

export const PaginationButton = ({ isSelected, page, onClick }) => {
  const buttonDisplay = useMemo(() => {
    const className = isSelected ? 'bg-primary' : 'bg-white text-black75';
    switch (page) {
      case 'first':
        return <ChevronFirst className={clsx('font-bold', className)} />;
      case 'last':
        return <ChevronLast className={clsx('font-bold', className)} />;
      default:
        return <p className={clsx('font-bold', className)}>{page}</p>;
    }
  }, [page, isSelected]);

  return (
    <MyButton
      className={`${
        isSelected ? 'bg-primary ' : 'bg-white'
      } shadow-md shadow-black50 border border-black10`}
      size={'icon'}
      onClick={onClick}
    >
      {buttonDisplay}
    </MyButton>
  );
};
