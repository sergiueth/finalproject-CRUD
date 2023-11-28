import React, { useState } from "react";
import { StyleSheet, FlatList, Image, Dimensions } from "react-native";
import { colors } from "../../utils/colors";
import { View } from "react-native";
const { height, width } = Dimensions.get("window");

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollEnd = (e) => {
    console.log("e.nativeEvent :>>", e.nativeEvent);
    const horizontalOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(horizontalOffset / width);
    console.log("index :>>", index);
    setActiveIndex(index);
  };

  const renderImage = ({ item }) => {
    return <Image style={styles.image} source={{ uri: item }} />;
  };
  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        data={images}
        renderItem={renderImage}
        onMomentumScrollEnd={handleScrollEnd}
      />
      <View style={styles.pagination}>
        {images?.map((_, i) => (
          <View
            key={i}
            style={[
              styles.paginationLine,
              i === activeIndex ? styles.activeLine : {},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height * 0.45,
  },
  list: {},
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  paginationLine: {
    height: 4,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    margin: 5,
  },
  activeLine: {
    backgroundColor: colors.black,
    width: 30,
  },
});

export default React.memo(ImageCarousel);
