import React, { useState, useContext } from "react";
import { Image, Text, StyleSheet, View, Alert } from "react-native";
import { colors } from "../../../utils/colors";
import AuthHeader from "../../../components/AuthHeader";
import Input from "../../../components/Input";
import Checkbox from "../../../components/Checkbox";
import Button from "../../../components/Button";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import { request } from "../../../utils/request";
import { signup } from "../../../utils/backendCalls";
import { UserContext } from "../../../../App";

const Signup = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({});
  const { setUser } = useContext(UserContext);

  const onSignIn = () => {
    navigation.navigate("Signin");
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const onSubmit = async () => {
    try {
      if (
        !values?.fullName ||
        !values?.email ||
        !values?.password ||
        !values?.confirmPassword
      ) {
        Alert.alert("All fields are required");
        return;
      }

      if (values?.password !== values?.confirmPassword) {
        Alert.alert("Passwords do not match");
        return;
      }

      if (!checked) {
        Alert.alert("Please agree to the terms");
        return;
      }

      const token = await signup(values);
      setUser({ token });

      console.log("token :>> ", response);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <AuthHeader
          onBackPress={onBack}
          style={styles.authHeader}
          title="Sign Up"
        />
        <Input
          value={values.fullName}
          onChangeText={(v) => onChange("fullName", v)}
          label="Name"
          placeholder="John Doe"
        />
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
        <Input
          value={values.confirmPassword}
          onChangeText={(v) => onChange("confirmPassword", v)}
          isPassword
          label="Confirm Pawssord"
          placeholder="********"
        />

        <View style={styles.agreeRow}>
          <Checkbox checked={checked} onCheck={setChecked} />
          <Text style={styles.agreeText}>
            I agree with <Text style={styles.agreeTextBold}>Terms</Text>&
            <Text style={styles.agreeTextBold}>Privacy Policy</Text>
          </Text>
        </View>

        <View style={styles.buttonCont}>
          <Button onPress={onSubmit} style={styles.button} title="Sign Up" />
        </View>

        <Separator text="Or sign up with" />

        <GoogleLogin />

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text onPress={onSignIn} style={styles.footerLink}>
            Sign In
          </Text>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 380, // Set your desired maximum width
    marginTop: 20,
    alignSelf: "center", // Center the container horizontally
  },
  authHeader: {},
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
    marginTop: 26,
    textAlign: "center",
  },
  footerLink: {
    fontWeight: "bold",
  },
  buttonCont: {
    width: "90%",
    flexDirection: "row",
  },
});

export default Signup;
