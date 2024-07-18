import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../../../constant";
import TitleBar from "../../../molecule/title-bar";
import { AskedQuestionContext } from "./AskedQuestionStore";
import { DropdownItem } from "./DropDownItem";
import { getMyQuestionsSv } from "../../../services/guest/question.sv";

export const AskedQuestionContent = () => {
  const { params, setParams } = useContext(AskedQuestionContext);

  const [endReached, setEndReached] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(null);

  const [questions, setQuestions] = useState([]);

  const navigation = useNavigation();

  const getMyQuestions = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getMyQuestionsSv(params);
      setQuestions((prev) => {
        const existedIds = prev.map((question) => question._id);
        const newQuestion = response.questions.filter(
          (question) => !existedIds.includes(question._id)
        );
        // console.log([...prev, ...newQuestion]);
        return [...prev, ...newQuestion];
      });
      if (response.pages === params.page) setEndReached(true);
    } catch (error) {
      console.log("getMyQuestions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyQuestions();
  }, [params]);

  const handleItemSelect = (id) => {
    if (id === selected) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  };

  const handleLazy = (nativeEvent) => {
    if (!endReached && isCloseToBottom(nativeEvent)) {
      // console.log("reached end");
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 8;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <View style={{ marginTop: 16, paddingHorizontal: 16, paddingBottom: 48 }}>
      <TitleBar
        title={"Câu hỏi đã hỏi"}
        onBack={() => {
          navigation.navigate("UserMenu");
        }}
      />
      <View style={{ marginTop: 8 }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => handleLazy(nativeEvent)}
        >
          {questions.map((question) => {
            return (
              <DropdownItem
                key={question._id}
                data={question}
                id={question._id}
                isOpen={selected === question._id}
                onSelect={() => handleItemSelect(question._id)}
              />
            );
          })}
        </ScrollView>
        {endReached && params.page !== 0 && (
          <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>Đã hết câu hỏi ...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  fallbackContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: 8,
  },
  fallbackText: {
    fontSize: 16,
    fontFamily: fonts.BahnschriftRegular,
  },
});
