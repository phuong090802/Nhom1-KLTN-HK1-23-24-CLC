import { StyleSheet, Text, View } from "react-native";
import { ItemLayout } from "../../../template/item-layout/ItemLayout";
import { useContext, useMemo } from "react";
import { CounsellorListContext } from "./CounsellorListStore";
import MyIcon from "../../../atom/my-icon/MyIcon";
import { fonts } from "../../../../constant";
import { getRoleName } from "../../../util/convert.util";

export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(CounsellorListContext);

  const handleExpand = () => {
    if (data._id === selected) setSelected(-1);
    else setSelected(data._id);
  };

  return (
    <ItemLayout
      image={data.avatar}
      onExpand={handleExpand}
      isSelected={selected === data._id}
      text={data.fullName}
    >
      <View style={styles.container}>
        <InforBox
          title={"Số điện thoại"}
          content={data.phoneNumber}
          icon={<MyIcon iconPackage={"Feather"} name={"phone"} size={20} />}
        />
        <InforBox
          title={"Email"}
          content={data.email}
          icon={<MyIcon iconPackage={"Feather"} name={"mail"} size={20} />}
        />
        <InforBox
          title={"Chức vụ"}
          content={getRoleName(data.role)}
          icon={<MyIcon iconPackage={"Octicons"} name={"id-badge"} size={20} />}
        />
        <InforBox
          title={"Khoa"}
          content={data.department}
          icon={<MyIcon iconPackage={"Feather"} name={"layers"} size={20} />}
        />
      </View>
    </ItemLayout>
  );
};

const InforBox = ({ title, content, icon }) => {
  const inforBoxComponent = useMemo(() => {
    return (
      <View style={styles.inforBox}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "start",
            minWidth: 150,
            gap: 8,
          }}
        >
          {icon}
          <Text style={styles.text}>{title}:</Text>
        </View>
        <Text style={styles.text}>{content}</Text>
      </View>
    );
  }, [title, content, icon]);
  return inforBoxComponent;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 8,
  },
  inforBox: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.BahnschriftRegular,
    flex: 1,
    flexWrap: "wrap",
  },
});
