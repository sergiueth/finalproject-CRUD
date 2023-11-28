import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { colors } from "../../utils/colors";

const EditableBox = ({ label, value, editable, style, onChangeText }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: colors.white,
    marginVertical: 12,
    borderRadius: 4,
  },
  label: {
    colors: colors.grey,
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default React.memo(EditableBox);
