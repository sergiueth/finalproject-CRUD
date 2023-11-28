import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../utils/colors";

const GoogleLogin = () => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container}>
      <Image style={styles.Image} source={require("../../assets/google.png")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGrey,
    borderRadius: 14,
    width: 140,
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  Image: {
    width: 25,
    height: 25,
  },
});

export default React.memo(GoogleLogin);
