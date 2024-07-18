import { createRef, useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import QuillEditor from "react-native-cn-quill";
import { fonts } from "../../../../constant";
import MyButton from "../../../atom/my-button";
import { useAuthorSocketHook } from "../../../hooks/useAuthorSocketHook";
import IconInput from "../../../molecule/icon-input";
import MySelect from "../../../molecule/my-select";
import {
  getDepFieldsSv,
  getDepsSv,
} from "../../../services/guest/department.sv";
import {
  transformDepartments,
  transformsFields,
} from "../../../util/convert.util";
import { CreateQuestionContext } from "./CreateQuestionStore";
import useDepartmentField from "../../../hooks/useDepartmentField";
import MyRichText from "../../../atom/my-rich-text";
import { useNavigation } from "@react-navigation/native";
// import { createQuestion } from "../../../socket/guest/authorSocket";

const CreateQuestionForm = () => {
  const { connected, createQuestion, authorSocket } = useAuthorSocketHook();

  const initQuestionData = {
    departmentId: "",
    fieldId: "",
    title: "",
    content: "",
  };

  const {
    deps,
    fields,
    selectedDep,
    selectedField,
    setSelectedDep,
    setSelectedField,
  } = useDepartmentField();

  const [questionData, setQuestionData] = useState(initQuestionData);

  const navigation = useNavigation();

  const _editor = createRef();

  const [key, setKey] = useState(1);

  const handleHtmlChange = (data) => {
    setQuestionData((prev) => ({ ...prev, content: data.html }));
  };

  const handleDepSelect = (value) => {
    console.log(value);
    setSelectedDep(value === "null" ? null : value);
  };

  const handleFieldSelect = (value) => {
    console.log(value);
    setSelectedField(value === "null" ? null : value);
  };

  const handleTitleChange = (value) => {
    setQuestionData((prev) => ({ ...prev, title: value }));
  };

  const submitValidate = () => {
    console.log(
      "questionData.content",
      questionData.content,
      "questionData.title",
      questionData.title,
      "fieldId",
      selectedField
    );
    if (
      !questionData.content ||
      !questionData.title ||
      !selectedDep ||
      !selectedField
    ) {
      Alert.alert(
        "Vui lòng chọn khoa và lĩnh vực, đồng thời nhập đầy đủ Tiêu đề và nội dung câu hhỏi"
      );
      return false;
    }
    return true;
  };

  const handleCreateQuestion = async () => {
    console.log(connected);
    if (!connected || !submitValidate()) {
      return;
    }
    const temp = {
      ...questionData,
      departmentId: selectedDep,
      fieldId: selectedField,
    };
    try {
      const response = await authorSocket.emitWithAck("question:create", temp);
      if (response.success) {
        Alert.alert("Đặt câu hỏi thành công");
        setQuestionData((prev) => ({ ...prev, title: "", content: "" }));
        navigation.navigate("AppHome")
        _editor.current.setContents([{ insert: "\n" }]);
      }
    } catch (error) {
      console.log("handleCreateQuestion", error);
    }
  };

  return (
    <View style={style.content} key={key}>
      <View style={style.box}>
        <Text style={style.label}>Khoa:</Text>
        <MySelect
          width={"70%"}
          data={deps}
          onChange={handleDepSelect}
          placeholder={"Chọn khoa"}
        />
      </View>
      <View style={style.box}>
        <Text style={style.label}>Lĩnh vực:</Text>
        <MySelect
          width={"70%"}
          data={fields}
          onChange={handleFieldSelect}
          placeholder={"Chọn lĩnh vực"}
          defaultOption={
            questionData.fieldId === "" && {
              key: "null",
              value: "Chọn lĩnh vực",
            }
          }
        />
      </View>
      <View style={style.box}>
        <IconInput
          boxStyle={{}}
          placeholder={"Tiêu đề"}
          icon={"text-fields"}
          iconPackage={"MaterialIcons"}
          onChange={handleTitleChange}
          value={questionData.title}
        />
      </View>
      <View style={style.box}>
        <MyRichText
          // minHeight={}
          editorRef={_editor}
          setValue={handleHtmlChange}
        />
        {/* <QuillEditor
          style={style.editor}
          ref={_editor}
          // initialHtml=""
          onHtmlChange={handleHtmlChange}
          quill={{
            placeholder: "Nhập nội dung câu hỏi",
            modules: {
              toolbar: false,
            },
          }}
        /> */}
      </View>
      <MyButton onPress={handleCreateQuestion} title={"Đặt câu hỏi"} />
    </View>
  );
};

const style = StyleSheet.create({
  content: { flex: 1, gap: 8 },
  box: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start",

    width: "100%",
  },
  label: {
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 18,
    marginTop: 10,
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 5,
    backgroundColor: "white",
    height: 200,
    fontFamily: fonts.BahnschriftRegular,
  },
});

export default CreateQuestionForm;
