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

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://10.0.0.123:5000/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
         Alert.alert("User Successfully Created", response.data.message);
        navigation.navigate("SignIn");
      } else {
        Alert.alert("Error", "Failed to Sign Up");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to Sign Up");
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
        <Text style={styles.signupText}>Sign Up</Text>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>NAME</Text>
          <TextInput
            style={styles.signupInput}
            placeholder="Joe Doe"
            value={name}
            onChangeText={setName}
          />
        </View>
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
            <Text>Aleardy Signed up?</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text
              style={{
                color: "blue",
                borderBottomWidth: 1,
                borderColor: "blue",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
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

export default SignUp;
