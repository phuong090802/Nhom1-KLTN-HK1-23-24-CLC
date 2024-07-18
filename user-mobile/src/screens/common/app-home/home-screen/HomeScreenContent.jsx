import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SearchModal from "./SearchModal";
import SortModal from "./SortModal";
import { colors, fonts } from "../../../../../constant";
import { HomeContext } from "./HomeStore";
import { modalName } from "./const";
import TitleBar from "../../../../molecule/title-bar";
import { getQuestionsSv } from "../../../../services/guest/question.sv";
import DropdownItem from "./DropdownItem";
import HomeSkeletonGroup from "./HomeSkeletonGroup";

export const HomeScreenContent = () => {
  const {
    setShowingModal,
    params,
    setParams,
    setQuestions,
    questions,
    selected,
    setSelected,
  } = useContext(HomeContext);

  const [endReached, setEndReached] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLazy = (nativeEvent) => {
    if (!endReached && isCloseToBottom(nativeEvent)) {
      console.log("reached end");
      setParams((prev) => ({ ...prev, skip: questions.length }));
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

  const getQuestions = async () => {
    if (loading) return;
    if (endReached && params.skip !== 0) {
      return;
    }
    setLoading(true);
    try {
      if (params.skip === 0) setEndReached(false);
      const response = await getQuestionsSv(params);
      setQuestions((prev) => {
        const existedIds = prev.map((question) => question._id);
        const newQuestion = response.questions.filter(
          (question) => !existedIds.includes(question._id)
        );
        return [...prev, ...newQuestion];
      });
      if (response.totalQuestions === questions.length) setEndReached(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemSelect = (id) => {
    if (id === selected) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [params]);

  return (
    <>
      <SearchModal />
      <SortModal />
      <View style={styles.container}>
        <TitleBar
          title={"Hỏi đáp"}
          onSearch={() =>
            setShowingModal((prev) => [...prev, modalName.search])
          }
          onSort={() => setShowingModal((prev) => [...prev, modalName.sort])}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => handleLazy(nativeEvent)}
        >
          {!loading && questions.length === 0 ? (
            <View style={styles.fallbackContainer}>
              <Text style={styles.fallbackText}>Không có câu hỏi nào!!</Text>
            </View>
          ) : (
            questions.map((question) => (
              <DropdownItem
                key={question._id}
                data={question}
                id={question._id}
                isOpen={selected === question._id}
                onSelect={() => handleItemSelect(question._id)}
              />
            ))
          )}
          {loading && <HomeSkeletonGroup />}
          {endReached && params.skip !== 0 && (
            <View style={styles.fallbackContainer}>
              <Text style={styles.fallbackText}>Đã hết câu hỏi ...</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  scrollView: {
    marginTop: 8,
  },
  fallbackContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  fallbackText: {
    fontSize: 16,
    fontFamily: fonts.BahnschriftRegular,
  },
});
