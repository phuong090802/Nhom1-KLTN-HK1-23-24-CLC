import {
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string;
}

const FloatInput: FC<InputProps> = ({
  error,
  label,
  onBlur,
  value,
  name,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const handleBlur = useCallback(
    (e: any) => {
      if (!value) {
        setFocused(false);
      }
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur]
  );

  useEffect(() => {
    if (!value) setFocused(false);
    else setFocused(true);
  }, [value]);

  const handleLabelClick = () => {
    const inputElement = document.querySelector(`#${name}`);
    if (inputElement && !focused) {
      inputElement.focus();
    }
  };

  return (
    <div className="">
      <div className="relative leading-10 h-10 mb-6">
        <input
          {...props}
          value={value}
          name={name}
          id={name}
          className={`absolute w-full outline-none text-base border-2 rounded-lg bg-transparent transition-all h-10 px-4`}
          onFocus={() => setFocused(true)}
          onBlur={(e) => handleBlur(e)}
        />
        <label
          onClick={handleLabelClick}
          className={`absolute text-base mx-4 bg-transparent top-2 cursor-text ${
            focused && '-translate-y-[20px] bg-white scale-90 -translate-x-1'
          } duration-500`}
        >
          {label}
        </label>
        {error && (
          <p className="absolute -bottom-4 text-xs text-error left-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
export default FloatInput;
