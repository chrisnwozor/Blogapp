import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useState } from "react";

const DetailBlogScreen = ({ route }) => {
  const { detail } = route.params;

  // const [title, setTitle] = useState(detail.title);
  // const [author, setAuthor] = useState(detail.author);
  // const [image, setImage] = useState(detail.image);
  // const [message, setMessage] = useState(detail.message);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView stlye={{}}>
        <Image
          style={{ height: 350 }}
          resizeMode="contain"
          source={{ uri: detail.image }}
        />
        <Text style={{ fontSize: 25, marginTop: 20, marginHorizontal: 10 }}>
          TITLE: {detail.title}
        </Text>
        <Text style={{ fontSize: 20, marginTop: 20, marginHorizontal: 10 }}>
          AUTHOR: {detail.author}
        </Text>
        <Text style={{ fontSize: 20, marginTop: 20, marginHorizontal: 10 }}>
          {detail.message}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailBlogScreen;
