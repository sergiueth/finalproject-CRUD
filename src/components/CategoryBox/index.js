import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { colors } from "../../utils/colors";
import Input from "../Input";

const CategoryBox = ({ title, image, onPress, isFirst, isSelected }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isFirst ? { marginLeft: 24 } : {}]}
    >
      <View
        style={[
          styles.imageContainer,
          isSelected ? { backgroundColor: colors.black } : {},
        ]}
      >
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <Text
        style={[
          styles.title,
          isSelected ? { color: colors.blue, fontWeight: "500" } : {},
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.grey,
  },
  image: {
    width: 32,
    height: 32,
  },
  imageContainer: {
    backgroundColor: colors.lightGrey,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default CategoryBox;
