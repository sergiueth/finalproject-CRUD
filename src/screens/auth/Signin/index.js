import React, { useState, useContext } from "react";
import { Image, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../../utils/colors";
import AuthHeader from "../../../components/AuthHeader";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import { UserContext } from "../../../../App";
import { login } from "../../../utils/backendCalls";

const Signin = ({ navigation }) => {
  const [values, setValues] = useState({});
  const { setUser } = useContext(UserContext);

  const onSignUp = () => {
    navigation.navigate("Signup");
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const onSubmit = async () => {
    const token = await login(values);

    setUser({ token });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Sign In" />
        <Input
          value={values.email}
          onChangeText={(v) => onChange("email", v)}
          label="E-mail"
          placeholder="example@gmail.com"
        />
        <Input
          value={values.password}
          onChangeText={(v) => onChange("password", v)}
          isPassword
          label="Pawssord"
          placeholder="********"
        />

        <Button onPress={onSubmit} style={styles.button} title="Sign In" />

        <Separator text="Or sign in with" />

        <GoogleLogin />

        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text onPress={onSignUp} style={styles.footerLink}>
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 380, // Set your desired maximum width
    alignSelf: "center", // Center the container horizontally
    padding: 24,
    marginTop: 40,
  },
  agreeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  agreeText: {
    color: colors.blue,
    marginHorizontal: 13,
  },
  agreeTextBold: {
    fontWeight: "bold",
  },
  button: {
    marginVertical: 20,
  },
  footerText: {
    color: colors.blue,
    marginTop: 46,
    textAlign: "center",
  },
  footerLink: {
    fontWeight: "bold",
  },
});

export default Signin;
