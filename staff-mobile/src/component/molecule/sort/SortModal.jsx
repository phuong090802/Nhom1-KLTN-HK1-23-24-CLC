import React from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../atomic/my-icon";
import sort from ".";

export const SortModal = ({ visible, onClose, data, setParams }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 2,
              paddingBottom: 8,
              paddingHorizontal: 16,
            }}
          >
            <View></View>
            <Text style={styles.title}>Sort By</Text>
            <TouchableOpacity activeOpacity={0.4} onPress={onClose}>
              <MyIcon
                iconPackage="Fontisto"
                name={"close"}
                size={32}
                color={colors.black75}
              />
            </TouchableOpacity>
          </View>
          <View>
            {data &&
              data.map((option, index) => {
                return (
                  <View key={index} style={{ borderBottomWidth: 0.2 }}>
                    <TouchableOpacity
                      style={styles.option}
                      activeOpacity={0.4}
                      onPress={() =>
                        setParams((prev) => ({ ...prev, sort: option.value }))
                      }
                    >
                      <Text style={styles.text}>
                        {option.text || "Thứ tự sắp xếp"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: colors.white,
    paddingTop: 16,
    borderRadius: 8,
    width: "80%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: fonts.BahnschriftBold,
    fontSize: 22,
    color: colors.black75,
  },
  option: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 18,
    color: colors.black75,
  },
});
