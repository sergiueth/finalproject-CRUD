import React, { useContext } from "react";
import { Alert, StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoritesItem from "../../../components/FavoriteItem";
import Header from "../../../components/Header";
import { ServicesContext } from "../../../../App";
import { updateService } from "../../../utils/backendCalls";

const Favorites = ({ navigation }) => {
  const { services, setServices } = useContext(ServicesContext);
  const likedServices = Array.isArray(services)
    ? services?.filter((service) => service?.liked)
    : [];

  const renderItem = ({ item }) => {
    const onProductPress = () => {
      navigation.navigate("ProductDetails", { product: item });
    };

    const onRemove = async () => {
      const updatedServices = await updateService(item?._id, { liked: false });
      if (Array.isArray(updatedServices)) {
        setServices(updatedServices);
      }
    };

    const onIconPress = () => {
      Alert.alert(
        "Are your sure you want to remove this item from your favorites?",
        "",
        [{ text: "Yes", onPress: onRemove }, { text: "Cancel" }]
      );
    };
    return (
      <FavoritesItem
        onPress={onProductPress}
        onIconPress={onIconPress}
        {...item}
      />
    );
  };

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView>
      <Header title="Favorites" showBack onBackPress={goBack} />
      <FlatList
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            You do not have any favorites yet
          </Text>
        }
        data={likedServices}
        renderItem={renderItem}
        keyExtractor={(item) => String(item?._id)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Favorites);
