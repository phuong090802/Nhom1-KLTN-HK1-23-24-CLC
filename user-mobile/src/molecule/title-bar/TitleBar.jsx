import { LinearGradient } from "expo-linear-gradient";
import { Octicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { style } from "./const";
import MyIcon from "../../atom/my-icon/MyIcon";

const TitleBar = ({ onSearch, onSort, title, onBack }) => {
  return (
    <LinearGradient
      colors={["#2785DC", "#1DDBD2"]}
      start={[0, 0]}
      end={[1, 0]}
      style={style.container}
    >
      <View style={{ flexDirection: "row" }}>
        {onBack && (
          <TouchableOpacity onPress={onBack}>
            <MyIcon
              name={"chevron-back"}
              iconPackage={"Ionicons"}
              color={"#fff"}
              size={24}
            />
          </TouchableOpacity>
        )}
        <Text style={style.title}>{title || "Chưa có tiêu đề"}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 16 }}>
        {onSort && (
          <TouchableOpacity onPress={onSort}>
            <Octicons name="filter" color={"#fff"} size={24} />
          </TouchableOpacity>
        )}
        {onSearch && (
          <TouchableOpacity onPress={onSearch}>
            <Octicons name="search" color={"#fff"} size={24} />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default TitleBar;
