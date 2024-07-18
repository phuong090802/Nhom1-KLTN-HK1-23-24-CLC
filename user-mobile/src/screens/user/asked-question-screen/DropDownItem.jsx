import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fonts } from "../../../../constant";
import IconButton from "../../../atom/icon-button";
import Octicon from "../../../atom/octicon";
import { dateTimeToDate } from "../../../util/convert.util";
import AnswerBox from "./AnswerBox";
import QuestionBox from "./QuestionBox";

export const DropdownItem = ({ data, isOpen, onSelect }) => {
  const handleSelect = useCallback(() => {
    if (onSelect) onSelect();
  }, [onSelect]);


  return (
    !!data && (
      <>
        <View style={dropdownItemStyles.container}>
          <View style={dropdownItemStyles.header}>
            <View style={dropdownItemStyles.questionInfor}>
              <Text style={dropdownItemStyles.title}>{data.title}</Text>
              <View style={dropdownItemStyles.inforContainer}>
                <Octicon name={"clock"} size={16} />
                <Text style={dropdownItemStyles.inforText}>
                  {dateTimeToDate(data.createdAt)}
                </Text>
                <Octicon name={"eye"} size={16} />
                <Text style={dropdownItemStyles.inforText}>
                  {data?.views || 0}
                </Text>
              </View>
            </View>
            <View style={dropdownItemStyles.icon}>
              <IconButton
                iconName={"triangle-down"}
                iconColor={"#fff"}
                iconSize={20}
                onClick={handleSelect}
              />
            </View>
          </View>
          <View
            style={[
              dropdownItemStyles.dropDownContainer,
              isOpen ? dropdownItemStyles.open : dropdownItemStyles.close,
            ]}
          >
            <QuestionBox content={data.content} />
            {data?.user ? (
              <AnswerBox data={data.answer} />
            ) : (
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderTopWidth: 2,
                  borderTopColor: colors.black10,
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontFamily: fonts.BahnschriftBold, fontSize: 14 }}
                >
                  Đang chờ trả lời
                </Text>
              </View>
            )}
          </View>
        </View>
      </>
    )
  );
};

const dropdownItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingVertical: 16,
    borderWidth: 0.5,
    borderColor: colors.black10,
    marginBottom: 8,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  questionInfor: {
    width: "85%",
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.BahnschriftBold,
    color: colors.black75,
  },
  inforContainer: {
    marginTop: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  authorImage: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  inforText: {
    fontSize: 12,
    fontFamily: fonts.BahnschriftRegular,
  },
  icon: {},
  dropDownContainer: {
    paddingTop: 8,
    overflow: "hidden",
  },
  open: { height: "auto" },
  close: { height: 0 },
});
