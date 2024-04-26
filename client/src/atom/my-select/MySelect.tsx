import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import {
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { truncateText } from "../../util/convert.util";
import { cn } from "../../util/css.util";
import { getKeyByValue } from "../../util/object.util";
import { Option } from "./Option";

export const selectVariants = cva("outline-none px-4 text-left w-[300px] ", {
  variants: {
    variant: {
      default: "border-2 border-black25 rounded-lg",
      underline: "border-b-2 border-black-25",
    },
    boxHeight: {
      32: "h-8",
      40: "h-[40px]",
      48: "h-[48px]",
    },
  },
  defaultVariants: {
    variant: "default",
    boxHeight: 32,
  },
});

interface SelectProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof selectVariants> {
  data: { key: String | Number; value: String | Number }[];
  defaultData: any;
}

const MySelect: FC<SelectProps> = ({
  data,
  name,
  value,
  onChange,
  className,
  variant,
  onClick,
  boxHeight,
  placeholder,
  disabled,
  ...props
}) => {
  const [dropDown, setDropDown] = useState(false);

  const handleClick = useCallback(
    (value: any) => {
      if (onChange) {
        onChange(value);
        setDropDown(false);
      }
    },
    [onChange]
  );

  const heighCalculate = useMemo(() => {
    let boxH, dropDowmPosition, chevronPosition, optionH;
    switch (boxHeight) {
      case 40:
        boxH = "h-10";
        dropDowmPosition = "top-10";
        chevronPosition = "top-[10px]";
        optionH = "min-h-10";
        break;
      case 48:
        boxH = "h-12";
        dropDowmPosition = "top-12";
        chevronPosition = "top-[14px]";
        optionH = "min-h-12";
        break;
      default:
        boxH = "h-8";
        dropDowmPosition = "top-8";
        chevronPosition = "top-[6px]";
        optionH = "min-h-8";
        break;
    }

    return { boxH, dropDowmPosition, chevronPosition, optionH };
  }, [boxHeight]);

  useEffect(() => {
    if (disabled) setDropDown(false);
  }, [disabled]);

  return (
    <div className={"relative w-full "}>
      <input
        {...props}
        value={getKeyByValue(data, value) || placeholder || "Không có"}
        // value={getKeyByValue(data, value)}
        className={cn(
          selectVariants({ className, variant, boxHeight }),
          "truncate"
          // dropDown && "border-success"
        )}
        type="button"
      />

      <div
        className={clsx(
          dropDown ? "max-h-40" : "max-h-0",
          "absolute bg-transparent w-full z-20 rounded-lg overflow-hidden duration-700 bg-white"
        )}
      >
        <div
          className={clsx(
            "overflow-y-scroll w-full max-h-40 border border-black25 rounded-lg",
            heighCalculate.dropDowmPosition
          )}
        >
          {data ? (
            data.map((option, index) => (
              <Option
                key={option.value || index}
                optionKey={option.key}
                optionValue={option.value}
                onClick={() => handleClick(option.value)}
                className={clsx(heighCalculate.optionH, "cursor-pointer")}
              />
            ))
          ) : (
            <Option
              optionKey={"Không có"}
              optionValue={"null"}
              className={clsx(heighCalculate.optionH, "cursor-pointer")}
            />
          )}
        </div>
      </div>
      <ChevronDown
        className={cn(
          "absolute right-2 hover:bg-primary/20 rounded-full p-1 cursor-pointer",
          heighCalculate.chevronPosition
        )}
        size={20}
        onClick={() => {
          if (!disabled) setDropDown(!dropDown);
        }}
      />
    </div>
  );
};

export default MySelect;
