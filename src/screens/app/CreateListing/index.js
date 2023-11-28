import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Import KeyboardAwareScrollView
import Header from "../../../components/Header";
import { colors } from "../../../utils/colors";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { categories } from "../../../data/categories";
import { ServicesContext } from "../../../../App";
import { addServices } from "../../../utils/backendCalls";

const CreateListing = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const { setServices } = useContext(ServicesContext);

  console.log("values :>>", values);

  const goBack = () => {
    navigation.goBack();
  };

  const uploadNewImage = async (isCamera) => {
    setLoading(true);
    try {
      let result;
      if (isCamera) {
        result = await launchCameraAsync({
          mediaTypes: "Images",
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        result = await launchImageLibraryAsync({
          mediaTypes: "Images",
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      if (!result.cancelled) {
        setImages((list) => [...list, result]);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteImage = (imageUri) => {
    setImages((list) => list.filter((img) => img.uri !== imageUri));
  };

  const onChange = (value, key) => {
    setValues((val) => ({ ...val, [key]: value }));
  };

  const onSubmit = async () => {
    const updatedServices = await addServices({
      ...values,
      category: values.category?.id,
    });

    setServices(updatedServices);
    setValues({});
    navigation.navigate("MyListings");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        showBack={true}
        onBackPress={goBack}
        title="Create a new listing"
      />

      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraHeight={Platform.OS === "ios" ? 120 : 280} // Adjust the offset if needed
      >
        <Text style={styles.sectionTitle}>Upload Photos</Text>

        <View style={styles.imageRow}>
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={() => uploadNewImage(false)}
          >
            <View style={styles.uploadCircle}>
              <Text style={styles.uploadPlus}>+</Text>
            </View>
          </TouchableOpacity>

          {images.map((image, index) => (
            <View style={styles.imageCont} key={image.uri}>
              <Image style={styles.image} source={{ uri: image.uri }} />
              <Pressable hitSlop={20} onPress={() => onDeleteImage(image.uri)}>
                <Image
                  style={styles.delete}
                  source={require("../../../assets/close.png")}
                />
              </Pressable>
            </View>
          ))}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.darkGrey} />
            </View>
          )}
        </View>

        <Input
          placeholder="Listing Title"
          label="Title"
          value={values.title}
          onChangeText={(v) => onChange(v, "title")}
        />
        <Input
          placeholder="Select the category"
          label="Category"
          value={values.category}
          onChangeText={(v) => onChange(v, "category")}
          type="picker"
          options={categories}
        />
        <Input
          placeholder="Enter price in USD"
          label="Price"
          value={values.price}
          onChangeText={(v) => onChange(v, "price")}
          keyboardType="numeric"
        />
        <Input
          style={styles.textarea}
          placeholder="Tell us more..."
          label="Description"
          value={values.description}
          onChangeText={(v) => onChange(v, "description")}
          multiline
        />

        <Button onPress={onSubmit} title="Submit" style={styles.button} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  sectionTitle: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.blue,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  uploadContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    borderStyle: "dotted",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginTop: 8,
  },
  uploadCircle: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadPlus: {
    color: colors.white,
    fontSize: 24,
    paddingBottom: 2,
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  imageCont: {
    flexDirection: "row",
    marginBottom: 12,
    position: "relative",
  },
  delete: {
    width: 24,
    height: 24,
    marginLeft: -16,
    marginTop: -10,
  },
  loadingContainer: {},
  textarea: {
    minHeight: 140,
    paddingTop: 16,
  },
  button: {
    marginTop: 16,
    marginBottom: 60,
  },
});

export default React.memo(CreateListing);
