import { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import user_avatar from "../../../../assets/images/user_avatar.jpg";

import IconButton from "../../../atom/icon-button";
import Octicon from "../../../atom/octicon";

import { dateTimeToDate } from "../../../util/convert.util";

import AnswerBox from "./AnswerBox";
import QuestionBox from "./QuestionBox";
import { colors, fonts } from "../../../../constant";

export const DropdownItem = ({ data, isOpen, onSelect }) => {
  const handleSelect = useCallback(() => {
    if (onSelect) onSelect();
  }, [onSelect]);

  return (
    data && (
      <>
        <View style={dropdownItemStyles.container}>
          <View style={dropdownItemStyles.header}>
            <View style={dropdownItemStyles.questionInfor}>
              <Text style={dropdownItemStyles.title}>{data.title}</Text>
              <View style={dropdownItemStyles.inforContainer}>
                {/* <Image
                  source={
                    data?.user.avatar ? { uri: data.user.avatar } : user_avatar
                  }
                  style={dropdownItemStyles.authorImage}
                /> */}
                {/* <Text style={dropdownItemStyles.inforText}>
                  {data.user.fullName}
                </Text> */}
                <Octicon name={"clock"} size={16} />
                <Text style={dropdownItemStyles.inforText}>
                  {dateTimeToDate(data.createdAt)}
                </Text>
                <Octicon name={"eye"} size={16} />
                <Text style={dropdownItemStyles.inforText}>{data.views}</Text>
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
            <AnswerBox data={data.answer} />
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
