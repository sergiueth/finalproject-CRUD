import React, { useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";
import Button from "../../../components/Button";
import ImageCarousel from "../../../components/ImageCarousel";
import { API_BASE_URL } from "@env";
import { ServicesContext } from "../../../../App";
import { updateService } from "../../../utils/backendCalls";

const ProductDetails = ({ route, navigation }) => {
  const params = route?.params || {};
  const { services, setServices } = useContext(ServicesContext);
  const product = services?.find(
    (service) => service?._id === params?.product?._id
  );

  const onBackPress = () => {
    navigation.goBack();
  };

  const onContact = () => {
    // Make a phone call
    const phone = "124312412";
    Linking.openURL(`tel:${phone}`);

    // Send an Email
    const email = "support@mail.com";
    Linking.openURL(`mailto:${email}`);
  };

  console.log("product :>> ", product);

  const onBookmark = async () => {
    const data = await updateService(product?._id, { liked: true });
    console.log("data :>> data");
    setServices(data);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        {product?.images?.length ? (
          <ImageCarousel images={product?.images} />
        ) : (
          <Image
            style={styles.image}
            source={{ uri: `${API_BASE_URL}/${product?.image?.path}` }}
          />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.price}>$ {product?.price}</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>

        <Pressable onPress={onBackPress} style={styles.backContainer}>
          <Image
            style={styles.backIcon}
            source={require("../../../assets/back.png")}
          />
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Pressable onPress={onBookmark} style={styles.bookmarkContainer}>
            <Image
              style={styles.bookmarkIcon}
              source={
                product?.liked
                  ? require("../../../assets/bookmark_filled.png")
                  : require("../../../assets/bookmark_blue.png")
              }
            />
          </Pressable>
        </View>
        <Button onPress={onContact} title="Contact Company" />
      </View>
    </SafeAreaView>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  footer: {
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {},
  image: {
    width: "100%",
    height: height * 0.45,
    backgroundColor: colors.lightGrey,
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -40,
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "500",
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    color: colors.textGrey,
    fontWeight: "300",
    marginVertical: 8,
  },
  bookmarkContainer: {
    backgroundColor: colors.lightGrey,
    padding: 18,
    borderRadius: 8,
    marginRight: 16,
  },
  bookmarkIcon: {
    width: 23,
    height: 24,
  },
  backContainer: {
    backgroundColor: colors.white,
    padding: 10,
    margin: 24,
    borderRadius: 8,
    marginRight: 16,
    position: "absolute",
  },
  backIcon: {
    width: 20,
    height: 20,
  },
});

export default React.memo(ProductDetails);
