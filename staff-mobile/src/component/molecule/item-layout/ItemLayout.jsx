import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../atomic/my-icon";
import { OptionMenu } from "./OptionMenu";

const ItemLayout = ({
  text,
  status,
  onStatus,
  onEdit,
  onDetail,
  image,
  extraText,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const itemLayoutComponent = useMemo(() => {
    return (
      <View style={styles.container}>
        <OptionMenu
          visible={showMenu}
          setVisible={setShowMenu}
          onEdit={onEdit}
          onDetail={onDetail}
          onDelete={onDelete}
        />
        <View
          style={{
            width: "65%",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <View>
            {image !== undefined && (
              <Image style={styles.image} source={image} />
            )}
          </View>
          <View style={{ width: "100%" }}>
            <Text style={styles.text}>{text || "ItemLayout"}</Text>
            {extraText && (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={styles.extraText}>
                  {extraText || "ItemLayout"}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.buttonArea}>
          {status !== undefined && (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: status ? colors.success20 : colors.error20 },
              ]}
              activeOpacity={0.4}
              onPress={() => {
                if (onStatus) onStatus();
              }}
            >
              <MyIcon
                iconPackage="Octicons"
                name={status ? "unlock" : "lock"}
                color={colors.black75}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button]}
            activeOpacity={0.4}
            onPress={() => {
              setShowMenu(true);
            }}
          >
            <MyIcon
              iconPackage="Feather"
              name={"more-horizontal"}
              color={colors.black75}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [text, status, showMenu]);

  return itemLayoutComponent;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderColor: colors.primary,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.BahnschriftRegular,
    width: "100%",
  },
  buttonArea: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    backgroundColor: colors.primary20,
    borderRadius: 16,
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  extraText: {
    fontFamily: fonts.BahnschriftRegular,
    color: colors.black50,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 13,
    marginTop: 2,
  },
});

export default ItemLayout;
