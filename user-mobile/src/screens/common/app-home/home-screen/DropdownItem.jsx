import { useCallback } from "react";
import { Image, Text, View } from "react-native";

import user_avatar from "../../../../../assets/images/user_avatar.jpg";

import { dropdownItemStyles } from "./const";

import IconButton from "../../../../atom/icon-button";
import Octicon from "../../../../atom/octicon";

import { dateTimeToDate } from "../../../../util/convert.util";

import AnswerBox from "./AnswerBox";
import QuestionBox from "./QuestionBox";

const DropdownItem = ({ data, isOpen, onSelect }) => {
  const handleSelect = useCallback(() => {
    if (onSelect) onSelect();
  }, [onSelect]);

  return (
    data.user && (
      <>
        <View style={dropdownItemStyles.container}>
          <View style={dropdownItemStyles.header}>
            <View style={dropdownItemStyles.questionInfor}>
              <Text style={dropdownItemStyles.title}>{data.title}</Text>
              <View style={dropdownItemStyles.inforContainer}>
                <Image
                  source={
                    data?.user.avatar ? { uri: data.user.avatar } : user_avatar
                  }
                  style={dropdownItemStyles.authorImage}
                />
                <Text style={dropdownItemStyles.inforText}>
                  {data.user.fullName}
                </Text>
                <Octicon name={"clock"} size={16} />
                <Text style={dropdownItemStyles.inforText}>
                  {dateTimeToDate(data.createdAt)}
                </Text>
                <Octicon name={"eye"} size={16} />
                <Text style={dropdownItemStyles.inforText}>
                  {data.views || "0"}
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
            <AnswerBox data={data.answer} />
          </View>
        </View>
      </>
    )
  );
};

export default DropdownItem;
