import { VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef, useMemo } from 'react';

import { cn } from '../../util/css.util';

export const inputVariants = cva('w-full outline-none', {
  variants: {
    variant: {
      default: 'border-2 border-black10 rounded-md px-4',
      icon: 'border-2 border-black10 rounded-md pl-10 pr-4',
    },
    inputHeight: {
      32: 'h-8',
      40: 'h-10',
      48: 'h-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    inputHeight: 32,
  },
});

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon: any;
}

const MyInput = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, inputHeight, className, icon, ...props }, ref) => {
    const heightCalculate = useMemo(() => {
      let iconPosition;
      switch (inputHeight) {
        case 32:
          iconPosition = 'top-[4px]';
          break;
        case 40:
          iconPosition = 'top-[8px]';
          break;
        case 48:
          iconPosition = 'top-[12px]';
          break;
        default:
          iconPosition = 'top-[4px]';
          break;
      }
      return { iconPosition };
    }, [inputHeight]);

    return (
      <div className="relative">
        <input
          ref={ref}
          type="text"
          className={cn(inputVariants({ variant, inputHeight, className }))}
          {...props}
        />
        <div className={clsx('absolute left-4', heightCalculate.iconPosition)}>
          {!!icon && icon}
        </div>
      </div>
    );
  }
);

export default MyInput;
