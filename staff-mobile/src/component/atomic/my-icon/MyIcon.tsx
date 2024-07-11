import React, { FC, useMemo } from "react";
import { Text } from "react-native";

export interface MyIconProps {
  name: String;
  size: Number;
  color: String;
  iconPackage:
    | "AntDesign"
    | "Entypo"
    | "EvilIcons"
    | "Feather"
    | "Fontisto"
    | "FontAwesome"
    | "FontAwesome5"
    | "FontAwesome6"
    | "Foundation"
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "MaterialIcons"
    | "Octicons"
    | "SimpleLineIcons"
    | "Zocial";
}

const MyIcon: FC<MyIconProps> = ({ iconPackage, name, size, color }) => {
  const icon = useMemo(() => {
    let ImportedIcon: any;

    switch (iconPackage) {
      case "AntDesign":
        ImportedIcon = require("@expo/vector-icons/AntDesign").default;
        break;
      case "Entypo":
        ImportedIcon = require("@expo/vector-icons/Entypo").default;
        break;
      case "EvilIcons":
        ImportedIcon = require("@expo/vector-icons/EvilIcons").default;
        break;
      case "Feather":
        ImportedIcon = require("@expo/vector-icons/Feather").default;
        break;
      case "Fontisto":
        ImportedIcon = require("@expo/vector-icons/Fontisto").default;
        break;
      case "FontAwesome":
        ImportedIcon = require("@expo/vector-icons/FontAwesome").default;
        break;
      case "FontAwesome5":
        ImportedIcon = require("@expo/vector-icons/FontAwesome5").default;
        break;
      case "FontAwesome6":
        ImportedIcon = require("@expo/vector-icons/FontAwesome6").default;
        break;
      case "Foundation":
        ImportedIcon = require("@expo/vector-icons/Foundation").default;
        break;
      case "Ionicons":
        ImportedIcon = require("@expo/vector-icons/Ionicons").default;
        break;
      case "MaterialCommunityIcons":
        ImportedIcon =
          require("@expo/vector-icons/MaterialCommunityIcons").default;
        break;
      case "MaterialIcons":
        ImportedIcon = require("@expo/vector-icons/MaterialIcons").default;
        break;
      case "Octicons":
        ImportedIcon = require("@expo/vector-icons/Octicons").default;
        break;
      case "SimpleLineIcons":
        ImportedIcon = require("@expo/vector-icons/SimpleLineIcons").default;
        break;
      case "Zocial":
        ImportedIcon = require("@expo/vector-icons/Zocial").default;
        break;
      default:
        ImportedIcon = require("@expo/vector-icons/AntDesign").default;
        break;
    }

    return (
      <ImportedIcon name={name} size={size || 24} color={color || "#000"} />
    );
  }, [iconPackage, name, size, color]);

  return icon;
};

export default MyIcon;
