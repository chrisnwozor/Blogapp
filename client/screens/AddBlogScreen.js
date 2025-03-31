import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const AddBlogScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!title || !image || !message) {
      Alert.alert("Please fill all Fields");
      return;
    }
    try {
      await axios.post("http://10.0.0.123:5000/addblog", {
        title,
        image,
        message,
        author: author || "Anonymous",
      });
      Alert.alert("Blog Added Successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error adding blog");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <View
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                Add a Blog
              </Text>
            </View>
            <View style={{ marginHorizontal: 24, marginVertical: 15 }}>
              <Text style={{ fontSize: 25, color: "black" }}>Title</Text>
              <TextInput
                style={{
                  borderWidth: 2,
                  padding: 10,
                  marginTop: 20,
                  fontSize: 20,
                }}
                placeholder="Add a title"
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View style={{ marginHorizontal: 24, marginVertical: 15 }}>
              <Text style={{ fontSize: 25, color: "black" }}>Author</Text>
              <TextInput
                style={{
                  borderWidth: 2,
                  padding: 10,
                  marginTop: 20,
                  fontSize: 20,
                }}
                placeholder="Author"
                value={author}
                onChangeText={setAuthor}
              />
            </View>
            <View style={{ marginHorizontal: 24, marginVertical: 15 }}>
              <Text style={{ fontSize: 25, color: "black" }}>Image</Text>
              <TextInput
                style={{
                  borderWidth: 2,
                  padding: 10,
                  marginTop: 20,
                  fontSize: 20,
                }}
                placeholder="Image Link"
                value={image}
                onChangeText={setImage}
              />
            </View>
            <View style={{ marginHorizontal: 24, marginVertical: 15 }}>
              <Text style={{ fontSize: 25, color: "black" }}>Message</Text>
              <TextInput
                style={{
                  borderWidth: 2,
                  padding: 10,
                  marginTop: 20,
                  fontSize: 20,
                  height: 170,
                }}
                placeholder="Message"
                value={message}
                onChangeText={setMessage}
                multiline
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 24,
                marginVertical: 15,
                height: 50,
                borderRadius: 25,
              }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                Add Blog
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddBlogScreen;
