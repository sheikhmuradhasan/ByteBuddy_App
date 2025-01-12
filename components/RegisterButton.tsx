import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const RegisterButton = ({ onPress, loading = false, disabled = false }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, disabled && styles.disabled]}
      onPress={!disabled && !loading ? onPress : null}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.text}>Sign Up</Text>
      )}
    </TouchableOpacity>
  );
};

export default RegisterButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7C84D7",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  disabled: {
    backgroundColor: "#cccccc",
  },
  text: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
  },
});
