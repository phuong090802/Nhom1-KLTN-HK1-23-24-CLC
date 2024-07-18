import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from "react-native";
import TitleBar from "../../../molecule/title-bar";
import { useContext } from "react";
import { NotiScreenContext } from "./NotiScreenStore";
import { NotificationItem } from "./NotificationItem";

export const NotiScreenContent = () => {
  const { notifications } = useContext(NotiScreenContext);

  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 16, paddingHorizontal: 16, marginBottom: 100 }}>
      <TitleBar
        title={"Thông báo"}
        onBack={() => navigation.navigate("AppHome")}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification) => {
          return (
            <NotificationItem
              notification={notification}
              key={notification._id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 8,
  },
});
