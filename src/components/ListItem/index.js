import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { colors } from "../../utils/colors";

const ListItem = ({ title, subtitle, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {!!subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Image style={styles.arrow} source={require("../../assets/arrow.png")} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
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
  title: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    colors: colors.grey,
    marginTop: 6,
    fontSize: 12,
  },
  arrow: {
    width: 32,
    height: 32,
  },
});

export default React.memo(ListItem);
