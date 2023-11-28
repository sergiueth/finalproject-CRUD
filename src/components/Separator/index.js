import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

const Separator = ({ text, onPress, style }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    height: 1,
    backgroundColor: colors.lightGrey,
    flex: 1,
  },
  text: {
    color: colors.blue,
    fontWeight: "600",
    marginHorizontal: 8,
  },
});

export default Separator;
