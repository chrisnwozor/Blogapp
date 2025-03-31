import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://10.0.0.123:5000/login", {
        email,
        password,
      });
      const { token, name } = response.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("name", name);
      // Alert.alert(`Welcome, ${name}`);
      navigation.replace("Main");
    } catch (error) {
      Alert.alert("Error", "Failed to Login");
      console.log(error);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/goat.jpg")}
          style={styles.imageStyle}
        />
      </View>
      <View>
        <Text style={styles.signupText}>Sign In</Text>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>EMAIL</Text>
          <TextInput
            style={styles.signupInput}
            placeholder="JoeDoe@gmail.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>PASSWORD</Text>
          <TextInput
            style={styles.signupInput}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ marginRight: 5 }}>
            <Text>Don't Have an account</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text
              style={{
                color: "blue",
                borderBottomWidth: 1,
                borderColor: "blue",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "blue",
              borderBottomWidth: 1,
              borderColor: "blue",
            }}
          >
            Forgot Your Password?
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  signupText: {
    fontSize: 30,
    textAlign: "center",
  },
  signupInput: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: "#8e93a1",
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: "darkmagenta",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});

export default SignIn;
