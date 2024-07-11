import { useContext, useState } from "react";
import ModalLayout from "../../../component/molecule/modal-layout";
import { DepheadCounsellorContext } from "./DepheadCounsellorProvider";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import blank_avatar from "../../../../assets/images/blank_avatar.jpg";
import MyButton from "../../../component/atomic/my-button";

export const CounsellorDetailModal = () => {
  const {
    showCounsellorDetailModal,
    setShowCounsellorDetailModal,
    selectedCounsellor,
    setShowAddFieldsModal
  } = useContext(DepheadCounsellorContext);

  return (
    <ModalLayout
      title={"Thông tin tư vấn viên"}
      visible={showCounsellorDetailModal}
      onClose={() => setShowCounsellorDetailModal(false)}
    >
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderRadius: 16,
              borderColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              source={
                selectedCounsellor?.avatar === null
                  ? blank_avatar
                  : { uri: selectedCounsellor.avatar }
              }
              style={{ width: 66, height: 66 }}
            />
          </View>
        </View>
        <View style={styles.infor}>
          <Text style={[styles.text, { fontFamily: fonts.BahnschriftBold }]}>
            Họ & Tên:
          </Text>
          <Text style={styles.text}>
            {selectedCounsellor?.fullName || "Tên người dùng"}
          </Text>
        </View>
        <View style={styles.infor}>
          <Text style={[styles.text, { fontFamily: fonts.BahnschriftBold }]}>
            Email:
          </Text>
          <Text style={styles.text}>
            {selectedCounsellor?.email || "Email người dùng"}
          </Text>
        </View>
        <View style={styles.infor}>
          <Text style={[styles.text, { fontFamily: fonts.BahnschriftBold }]}>
            Số điện thoại:
          </Text>
          <Text style={styles.text}>
            {selectedCounsellor?.phoneNumber || "Số điện thoại"}
          </Text>
        </View>
        <View style={[{ flexDirection: "column" }]}>
          <Text style={[styles.text, { fontFamily: fonts.BahnschriftBold }]}>
            Lĩnh vực:
          </Text>
          <View style={styles.fieldsContainer}>
            {selectedCounsellor.fields?.length === 0 ? (
              <View>
                <Text>Nhân viên chưa có lĩnh vực nào</Text>
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  gap: 8,
                  paddingBottom: 8,
                  flexDirection: "column",
                  maxHeight: 200,
                }}
              >
                {selectedCounsellor.fields?.map((field) => {
                  return (
                    <Text
                      style={[
                        styles.text,
                        {
                          fontSize: 16,
                          fontFamily: fonts.BahnschriftRegular,
                          marginBottom: 12,
                        },
                      ]}
                      key={field._id}
                    >
                      {field?.fieldName}
                    </Text>
                  );
                })}
              </ScrollView>
            )}
          </View>
          <MyButton
            activeOpacity={0.5}
            style={[
              {
                marginTop: 16,
                backgroundColor: colors.black,
              },
            ]}
            buttonText={"Thêm lĩnh vực"}
            onPress={() => {
              setShowAddFieldsModal(true);
            }}
          />
        </View>
      </View>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 8,
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 16,
  },
  infor: { flexDirection: "row", gap: 8 },
  text: { fontFamily: fonts.BahnschriftRegular, fontSize: 18 },
  fieldsContainer: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.primary,
    maxHeight: 200,
    paddingTop: 4,
    paddingHorizontal: 8,
    marginTop: 4,
  },
});
