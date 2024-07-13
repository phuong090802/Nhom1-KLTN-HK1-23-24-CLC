import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../../../../constant";
import MyIcon from "../../../atom/my-icon";
import Layout from "../../../template/layout";
import { useNavigation } from "@react-navigation/native";
import TitleBar from "../../../molecule/title-bar";
import { useContext } from "react";
import { DataContext } from "../../../store/Store";

const MenuScreen = () => {
  const navigation = useNavigation();

  const { user } = useContext(DataContext);

  console.log(user);

  return (
    <Layout>
      <View style={styles.rootContainer}>
        <TitleBar
          title={"Menu người dùng"}
          onBack={() => navigation.navigate("AppHome")}
        />

        <View style={{ marginTop: 8, gap: 8 }}>
          <InforBox
            icon={<MyIcon iconPackage={"Feather"} name={"user"} size={24} />}
            label={"Họ & Tên"}
            data={user.fullName}
          />
          <InforBox
            icon={<MyIcon iconPackage={"Fontisto"} name={"email"} size={24} />}
            label={"Email"}
            data={user.email}
          />
          <InforBox
            icon={<MyIcon iconPackage={"SimpleLineIcons"} name={"phone"} size={24} />}
            label={"Số điện thoại"}
            data={user.phone}
          />
        </View>
        <View style={{ marginTop: 8 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AskedQuestion");
            }}
          >
            <Text style={[styles.title, { fontSize: 18 }]}>Câu hỏi đã hỏi</Text>
          </TouchableOpacity>
          <View style={styles.icon}>
            <MyIcon
              name={"chevron-forward"}
              iconPackage={"Ionicons"}
              size={24}
            />
          </View>
        </View>
        {/* <View style={{ marginTop: 8 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AppHome");
            }}
          >
            <Text style={styles.title}>Trở về</Text>
          </TouchableOpacity>
          <View style={styles.icon}>
            <MyIcon
              name={"chevron-forward"}
              iconPackage={"Ionicons"}
              size={24}
            />
          </View>
        </View> */}
      </View>
    </Layout>
  );
};

const InforBox = ({ icon, label, data }) => {
  return (
    <View style={[styles.button, { flexDirection: "row" }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          width: "45%",
        }}
      >
        {icon}
        <Text style={[styles.title, { fontSize: 16 }]}>{label}:</Text>
      </View>
      <Text style={{ fontFamily: fonts.BahnschriftRegular, fontSize: 16, flex: 1 }}>
        {data || "Chưa cập nhật!"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
    position: "relative",
  },
  button: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.black10,
  },
  title: {
    fontFamily: fonts.BahnschriftBold,
    fontSize: 16,
    color: colors.black75,
  },
  icon: {
    position: "absolute",
    top: 14,
    right: 16,
    backgroundColor: colors.black10,
    padding: 2,
    borderRadius: 20,
  },
});

export default MenuScreen;
