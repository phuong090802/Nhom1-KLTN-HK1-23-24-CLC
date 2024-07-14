import clsx from 'clsx';
import { CircleX } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../store';

const Search = ({ boxStyle, inputStyle, placeholder, setParams }) => {
  const [key, setKey] = useState('');

  const timeOutId = useRef();

  const { darkMode } = useContext(DataContext);

  const handleChange = (e) => {
    setKey(e.target.value);
  };

  const handleSearch = () => {
    if (setParams) {
      clearTimeout(timeOutId.current);
      timeOutId.current = setTimeout(() => {
        setParams((prev) => ({ ...prev, keyword: key, page: 1 }));
      }, 1000);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [key]);

  return (
    <div className={clsx('relative z-[1] ', boxStyle)}>
      <input
        autoComplete="off"
        name="temporaryName"
        value={key}
        onChange={(e) => handleChange(e)}
        type="text"
        className={clsx(
          'outline-none h-10 px-4 rounded-2xl text-black75 pr-9  overflow-hidden',
          inputStyle,
          darkMode ? 'bg-white' : 'bg-black10'
        )}
        placeholder={placeholder || 'Tìm kiếm'}
      />
      <CircleX
        className={`${
          key ? '' : 'hidden'
        } absolute right-2 top-2 cursor-pointer`}
        color="rgba(36, 41, 45, 0.75)"
        onClick={() => setKey('')}
      />
    </div>
  );
};
export default Search;
