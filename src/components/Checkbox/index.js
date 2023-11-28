import React from "react";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { colors } from "../../utils/colors";

const Checkbox = ({ checked, onCheck }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onCheck(!checked)}
      style={styles.container}
    >
      {checked ? (
        <View style={styles.innerContainer}>
          <Image
            style={styles.checkIcon}
            source={require("../../assets/check.png")}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 4,
    width: 22,
    height: 22,
  },
  innerContainer: {
    flex: 1, // Allow innerContainer to take up the entire space
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    width: 12,
    height: 9,
  },
});

export default React.memo(Checkbox);
