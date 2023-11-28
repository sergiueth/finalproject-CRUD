import React, { useEffect, useState, useContext } from "react";
import { FlatList, StyleSheet, ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import { categories } from "../../../data/categories";
import CategoryBox from "../../../components/CategoryBox";
import ProductHomeItem from "../../../components/ProductHomeItem";
import { getServices } from "../../../utils/backendCalls";
import { ServicesContext } from "../../../../App";

const Home = ({ navigation }) => {
  const [selectedCategory, setSelectedCatgory] = useState();
  const [keyword, setKeyword] = useState();
  const { services, setServices } = useContext(ServicesContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServices();
        console.log("data :>>", data);
        setServices(data);

        // Now that services are available, update filteredProducts
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, [setServices]);

  useEffect(() => {
    if (selectedCategory && !keyword) {
      const updatedProducts = services.filter(
        (product) => String(product?.category) === String(selectedCategory)
      );

      setFilteredProducts(updatedProducts);
    } else if (selectedCategory && keyword) {
      const updatedProducts = services.filter(
        (product) =>
          String(product?.category) === String(selectedCategory) &&
          product?.title?.toLowerCase().includes(keyword?.toLowerCase())
      );
      setFilteredProducts(updatedProducts);
    } else if (!selectedCategory && keyword) {
      const updatedProducts = services.filter((product) =>
        product?.title?.toLowerCase().includes(keyword?.toLowerCase())
      );
      setFilteredProducts(updatedProducts);
    } else if (!keyword && !selectedCategory) {
      setFilteredProducts(services);
    }
  }, [selectedCategory, keyword, services]);

  const renderCategoryItem = ({ item, index }) => {
    return (
      <CategoryBox
        onPress={() => setSelectedCatgory(item?.id)}
        isSelected={item?.id === selectedCategory}
        isFirst={index === 0}
        title={item?.title}
        image={item?.image}
      />
    );
  };

  const renderProductItem = ({ item }) => {
    const onProductPress = (product) => {
      navigation.navigate("ProductDetails", { product });
    };

    return <ProductHomeItem onPress={() => onProductPress(item)} {...item} />;
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Header
          showSearch
          onSearch={setKeyword}
          keyword={keyword}
          title="Find All you Need"
        />

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.list}
          horizontal
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => String(index)}
        />

        <ScrollView
          style={styles.productsListContainer}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            style={styles.productsList}
            numColumns={2}
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => String(item._id)}
            ListFooterComponent={<View style={{ height: 200 }} />}
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  list: {
    paddingVertical: 24,
  },
  productsListContainer: {
    maxHeight: 500, // Set a maximum height for the product list
  },
  productsList: {
    paddingHorizontal: 0,
  },
});

export default React.memo(Home);
