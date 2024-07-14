import clsx from 'clsx';
import { File } from 'lucide-react';

import { colors } from '../../constance';

const FileComponent = ({ link, darkMode }) => {
  return (
    <a
      className={clsx(
        'border px-2 py-1 flex items-center bg-primary/10 gap-2 rounded-lg max-w-44'
      )}
      href={link}
      target="_blank"
    >
      <File className="" color={darkMode ? '#fff' : colors.black75} />
      <p className={clsx(darkMode ? 'text-white' : 'text-black75')}>
        Tệp đính kèm
      </p>
    </a>
  );
};

export default FileComponent;
