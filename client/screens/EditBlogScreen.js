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

const EditBlogScreen = ({ navigation, route }) => {
  const { blog } = route.params;

  const [title, setTitle] = useState(blog.title);
  const [author, setAuthor] = useState(blog.author);
  const [image, setImage] = useState(blog.image);
  const [message, setMessage] = useState(blog.message);

  const handleUpdate = async () => {
    if (!title || !image || !message) {
      Alert.alert("Please fill all required fields");
      return;
    }
    try {
      await axios.put(`http://10.0.0.123:5000/update/${blog._id}`, {
        title,
        author,
        image,
        message,
      });
      Alert.alert("Blog Updated Successfully");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Failed to Update blog");
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
                Update Blog
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
              onPress={handleUpdate}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                Update Blog
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EditBlogScreen;
