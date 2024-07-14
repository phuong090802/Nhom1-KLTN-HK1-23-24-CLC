import clsx from 'clsx';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useRef } from 'react';

const MyRichText = ({
  editorState,
  setEditorState,
  placeholder,
  className,
  disable,
}) => {
  const editorRef = useRef();

  const focus = () => {
    editorRef.current.focus;
  };

  return (
    <div
      className={clsx(
        'border w-full py-2 rounded-xl overflow-hidden px-4',
        className
      )}
      onClick={focus}
    >
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={setEditorState}
        placeholder={placeholder || 'Nhập nội dung ...'}
        readOnly={disable}
      />
    </div>
  );
};

export default MyRichText;
