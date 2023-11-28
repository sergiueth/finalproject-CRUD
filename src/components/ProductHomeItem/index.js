import React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { colors } from "../../utils/colors";
import { Dimensions } from "react-native";
import { API_BASE_URL } from "@env";

const { width } = Dimensions.get("window");

console.log("width :>", width);

const ProductHomeItem = ({ title, price, image, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `${API_BASE_URL}/${image?.path}` }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>$ {price}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  title: {
    color: colors.textGrey,
    paddingVertical: 8,
  },
  image: {
    width: (width - 64) / 2,
    height: 200,
    borderRadius: 8,
  },
  price: {
    color: colors.black,
    paddingBottom: 8,
  },
});

export default React.memo(ProductHomeItem);
