import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import Button from "../../../components/Button";
import { colors } from "../../../utils/colors";

const Splash = ({ navigation }) => {
  const onSignup = () => {
    navigation.navigate("Signup");
  };

  const onSignin = () => {
    navigation.navigate("Signin");
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../../assets/splash_image.png")}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>You'll Find</Text>
          <Text style={[styles.title, styles.innerTitle]}>All you need </Text>
          <Text style={styles.title}>Here!</Text>
        </View>

        <View style={styles.buttonCont}>
          <Button onPress={onSignup} style={styles.button} title="Sign Up" />
        </View>

        <Pressable onPress={onSignin} hitSlop={20}>
          <Text style={styles.footerText}>Sign In</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  image: {
    width: 380,
    height: 200,
    paddingTop: 340,
  },
  titleContainer: {
    marginContainer: 34,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  innerTitle: {
    color: colors.orange,
    textDecorationLine: "underline",
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
  },
  footerText: {
    color: colors.blue,
    textAlign: "center",
    paddingBottom: 200,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonCont: {
    width: "100%",
    flexDirection: "row",
  },
});

export default Splash;
