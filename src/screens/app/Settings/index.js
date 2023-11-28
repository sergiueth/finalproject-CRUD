import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Linking,
  Image,
  Pressable,
} from "react-native";
// import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import ListItem from "../../../components/ListItem";
import Button from "../../../components/Button";
import { colors } from "../../../utils/colors";
import EditableBox from "../../../components/EditableBox";
import { ProfileContext } from "../../../../App";
import { updateProfile } from "../../../utils/backendCalls";

const Settings = ({ navigation }) => {
  const [editing, setEditing] = useState(false);
  const { profile, setProfile } = useContext(ProfileContext);
  const [values, setValues] = useState({
    _id: profile?._id,
    fullName: profile?.fullName,
    email: profile?.email,
  });

  const onEditPress = () => {
    setEditing(true);
  };

  const onSave = async () => {
    const updatedProfile = await updateProfile(values);
    setProfile(updatedProfile);
    setEditing(false);
  };

  const onChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const onItemPress = () => {
    Linking.openURL("https://google.com");
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header showBack onBackPress={goBack} title="Settings" />
      <ScrollView style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Pressable onPress={onEditPress}>
            <Image
              style={styles.icon}
              source={require("../../../assets/edit.png")}
            />
          </Pressable>
        </View>
        <EditableBox
          label="Name"
          onChangeText={(v) => onChange("fullName", v)}
          value={values.fullName}
          editable={editing}
        />
        <EditableBox
          label="Email"
          onChangeText={(v) => onChange("email", v)}
          value={values.email}
          editable={editing}
        />
        {editing ? (
          <Button style={styles.button} onPress={onSave} title="Save" />
        ) : null}

        <Text style={[styles.sectionTitle, { marginTop: 40 }]}>
          Help Center
        </Text>

        <ListItem onPress={onItemPress} style={styles.item} title="FAQ" />
        <ListItem
          onPress={onItemPress}
          style={styles.item}
          title="Contact Us"
        />
        <ListItem
          onPress={onItemPress}
          style={styles.item}
          title="Privacy & Terms"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  item: {
    padding: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    fontWeight: "500",
    fontSize: 16,
    color: colors.grey,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 24,
    height: 24,
  },
  button: {
    paddingVertical: 12,
    marginTop: 16,
  },
});

export default React.memo(Settings);
