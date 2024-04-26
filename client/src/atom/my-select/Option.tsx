import clsx from "clsx";
import { FC, HTMLAttributes } from "react";

interface OptionProps extends HTMLAttributes<HTMLDivElement> {
  optionKey: String | Number;
  optionValue: String | Number;
}

export const Option: FC<OptionProps> = ({
  optionKey,
  optionValue,
  className,
  ...props
}) => {
  
  return (
    <div
      {...props}
      className={clsx(
        "py-1 hover:bg-primary w-full hover:text-white pl-4 flex items-center",
        className
      )}
    >
      {typeof optionKey === "string" || typeof optionKey === "number"
        ? optionKey
        : null}
    </div>
  );
};
