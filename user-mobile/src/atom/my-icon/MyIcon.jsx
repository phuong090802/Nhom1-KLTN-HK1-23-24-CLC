import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';

const MyIcon = ({ name, size, color, iconPackage }) => {
  const iconProps = { name, size, color };

  const ICON = {
    AntDesign: <AntDesign {...iconProps} />,
    Entypo: <Entypo {...iconProps} />,
    EvilIcons: <EvilIcons {...iconProps} />,
    Feather: <Feather {...iconProps} />,
    FontAwesome: <FontAwesome {...iconProps} />,
    FontAwesome5: <FontAwesome5 {...iconProps} />,
    FontAwesome6: <FontAwesome6 {...iconProps} />,
    Fontisto: <Fontisto {...iconProps} />,
    Foundation: <Foundation {...iconProps} />,
    Ionicons: <Ionicons {...iconProps} />,
    MaterialCommunityIcons: <MaterialCommunityIcons {...iconProps} />,
    MaterialIcons: <MaterialIcons {...iconProps} />,
    Octicons: <Octicons {...iconProps} />,
    SimpleLineIcons: <SimpleLineIcons {...iconProps} />,
    Zocial: <Zocial {...iconProps} />,
  };

  return ICON[iconPackage];
};
export default MyIcon;
