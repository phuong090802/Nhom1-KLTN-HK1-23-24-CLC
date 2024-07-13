import { Text, View } from "react-native";
import TitleBar from "../../../molecule/title-bar";
import { useNavigation } from "@react-navigation/native";

export const NotiScreenContent = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
      <TitleBar
        title={"Thông báo"}
        onBack={() => navigation.navigate("AppHome")}
      />
    </View>
  );
};
