import { VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../util/css.util';

export const buttonVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: 'rounded-lg text-white duration-200',
      outline: 'bg-transparent rounded-lg text-primary duration-200',
    },
    size: {
      fullWidth: 'h-12 w-full font-semibold',
      lg: 'h-12 w-40 font-semibold',
      xl: 'h-14 w-60 font-semibold',
      default: 'h-10 w-20',
      md: 'h-10 px-8',
      sm: 'py-1 px-2',
      icon: 'w-8 h-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { loading, children, className, size, variant, color, hidden, ...props },
    ref
  ) => {
    return (
      <div className={clsx(hidden && 'hidden')}>
        <button
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {loading && (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2 animate-spin"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
            </svg>
          )}
          <span className="relative z-0">{children}</span>
        </button>
      </div>
    );
  }
);

export default MyButton;
