import React from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  Modal,
  onSelect,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { useState } from "react";

const Input = ({
  label,
  type,
  options,
  isPassword,
  value,
  onChangeText,
  placeholder,
  style,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPickerModalVisible, setPickerModalVisible] = useState(false);

  const onEyePress = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSelect = (opt) => {
    onChangeText(opt);
    setPickerModalVisible(false);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {type === "picker" ? (
        <Pressable
          onPress={() => setPickerModalVisible(true)}
          style={styles.inputContainer}
        >
          {value ? (
            <Text style={[styles.input, style]}>{value?.title}</Text>
          ) : (
            <Text style={[styles.placeholder, style]}>{placeholder}</Text>
          )}

          <View style={styles.eyeContainer}>
            <Image
              style={styles.arrow}
              source={require("../../assets/arrow.png")}
            />
          </View>
        </Pressable>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPassword && !isPasswordVisible}
            style={[styles.input, style]}
            {...props}
          />

          {isPassword ? (
            <View style={styles.eyeContainer}>
              <Pressable onPress={onEyePress}>
                <Image
                  style={styles.eye}
                  source={
                    isPasswordVisible
                      ? require("../../assets/eye.png")
                      : require("../../assets/eye_closed.png")
                  }
                />
              </Pressable>
            </View>
          ) : null}
        </View>
      )}

      <Modal transparent visible={isPickerModalVisible}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setPickerModalVisible(false)}
          style={styles.modalWrapper}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Text style={styles.headerTitle}>Select options</Text>

            {options?.map((opt) => {
              if (!opt?.id) {
                return null;
              }

              const selected = value?.id === opt?.id;

              return (
                <Text
                  onPress={() => onSelect(opt)}
                  style={[
                    styles.optionText,
                    selected ? styles.selectedOption : {},
                  ]}
                  key={opt?.title}
                >
                  {opt?.title}
                </Text>
              );
            })}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 20,
    marginBottom: 8,
    color: colors.blue,
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    position: "relative", // Add position relative
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flex: 1, // Allow the input to grow and take available space
  },
  eyeContainer: {
    position: "absolute",
    right: 16,
  },
  eye: {
    width: 24,
    height: 24,
  },
  arrow: {
    width: 24,
    height: 24,
    transform: [{ rotate: "90deg" }],
  },
  placeholder: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flex: 1,
    color: colors.lightGrey,
  },
  modalWrapper: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  headerTitle: {
    marginBottom: 16,
    color: colors.black,
    fontSize: 16,
  },
  optionText: {
    color: colors.black,
    paddingVertical: 4,
    fontSize: 15,
  },
  selectedOption: {
    color: colors.blue,
    fontWeight: "bold",
  },
});

export default Input;
