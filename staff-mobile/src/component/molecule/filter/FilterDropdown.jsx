import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../atomic/my-icon";

export const FilterDropdown = ({ data, onSelect }) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      renderButton={renderButton}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const renderButton = (selectedItem, isOpen) => {
  return (
    <View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonLabbel}>
          {selectedItem?.key || "Select your option"}
        </Text>
        <View style={styles.dropDownIcon}>
          <MyIcon
            name={isOpen ? "chevron-small-up" : "chevron-small-down"}
            iconPackage="Entypo"
          />
        </View>
      </View>
    </View>
  );
};

const renderItem = (item, index, isSelected) => {
  return (
    <View
      key={index}
      style={[
        { borderBottomWidth: 0.5, padding: 8 },
        isSelected && { backgroundColor: colors.primary10 },
      ]}
    >
      <Text style={styles.buttonLabbel}>{item.key}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  buttonLabbel: {
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 16,
    color: colors.black75,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropDownIcon: {},
});
