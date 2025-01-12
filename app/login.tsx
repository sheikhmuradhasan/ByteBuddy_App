import {StyleSheet,  View,  Text, TextInput, Alert, TouchableOpacity, Image} from "react-native";
import React, { useState } from "react";
import MyBtn from "@/components/MyBtn";
import { useRouter } from "expo-router";
import LoginButton from "@/components/LoginButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";

const Login = () => {
  const router = useRouter();
  const onContinue = () => {
    router.navigate("/signup");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Password validation regex
  const isValidPassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    return regex.test(password);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter your email and password!");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address!");
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long and include:\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one number\n- At least one special character"
      );
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged In Successfully!");
      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
      Alert.alert("Login Error", "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo-bg.png')} style={{width: 310, height: 120, resizeMode: 'center' }} />
      <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}>
        Log In to your account
      </Text>
      <TextInput
        placeholder="Enter your email address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter your password"
          style={styles.inputWithIcon}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="#888"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <LoginButton onPress={handleLogin} loading={loading} />
      <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
        Do not have an account?<Text style={{fontSize:15, fontWeight:"800", textDecorationLine:"underline"}} onPress={onContinue}> Signup </Text>
      </Text> 
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#CCCFEC",
    padding: 20,
    gap: 15,
  },

  input: {
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  inputWithIcon: {
    flex: 1,
    height: "100%",
  },
  eyeIcon: {
    marginLeft: 10,
  },
});


