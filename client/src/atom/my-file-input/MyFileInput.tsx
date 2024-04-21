import { FC, InputHTMLAttributes, useCallback, useMemo, useRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const MyFileInput: FC<InputProps> = ({ type, onChange, value, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const fileName = useMemo(() => {
    if (!value && !value?.name) return "Chọn file";
    else return value.name;
  }, [value]);

  const handleChange = useCallback(
    (e: any) => {
      console.log(typeof e);
      if (!onChange) return;
      onChange(e.target.files[0]);
    },
    [onChange]
  );

  return (
    <div className="border-2 border-black10 flex justify-between rounded-lg overflow-hidden">
      <div className="py-1 text-md pl-4">{fileName}</div>
      <div
        className="bg-primary text-white py-1 px-2 text-md hover:cursor-pointer"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <p>Chọn file</p>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default MyFileInput;
