import { ScrollView, StyleSheet } from 'react-native';
import QuillEditor from 'react-native-cn-quill';

const MyRichText = ({ editorRef, setValue, minHeight }) => {
  const customFonts = [
    {
      name: 'Roboto',
      css: `
        @font-face {
          font-family: 'Roboto';
          src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        }
        .ql-editor {
          font-family: 'Roboto', sans-serif;
          font-size: 16px; /* Set your desired font size here */
        }
      `,
    },
  ];

  return (
    <ScrollView style={styles.root}>
      <QuillEditor
        ref={editorRef}
        style={[styles.editor, { minHeight: minHeight || 150 }]}
        initialHtml=""
        onHtmlChange={(html) => setValue(html)}
        customFonts={customFonts}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    backgroundColor: '#eaeaea',
    // height: 400,
  },
  editor: {
    padding: 0,
    backgroundColor: 'white',
    flex: 1,
    // fontFamily: fonts.BahnschriftRegular,
  },
});

export default MyRichText;
