import React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { colors } from "../../utils/colors";
import { Dimensions } from "react-native";
import { API_BASE_URL } from "@env";

const { width } = Dimensions.get("window");

console.log("width :>", width);

const FavoritesItem = ({ title, price, icon, image, onPress, onIconPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `${API_BASE_URL}/${image?.path}` }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>

      <Pressable onPress={onIconPress}>
        <Image
          source={icon || require("../../assets/close.png")}
          style={styles.icon}
        />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  title: {
    color: colors.textGrey,
    paddingVertical: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  price: {
    colors: colors.black,
    paddingBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
});

export default FavoritesItem;
