import {
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userName, setUserName] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://10.0.0.123:5000/blog");
      setBlogs(res.data);
    } catch (error) {
      console.log("Error Fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getUserName = async () => {
      const name = await AsyncStorage.getItem("name");
      if (name) {
        setUserName(name);
      }
    };
    getUserName();
    fetchBlogs();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchBlogs();
    setIsRefreshing(false);
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await axios.delete(`http://10.0.0.123:5000/delete/${id}`);
      Alert.alert("Blog deleted Successfully");
      fetchBlogs();
    } catch (error) {
      console.log(error);
      Alert.alert("Failed to delete blog");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#000ff"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  // const openModal = (blog) => {
  //   setSelectedBlog(blog);
  //   setModalVisible(true);
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20, alignItems: "flex-start" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, {userName.toUpperCase()}
        </Text>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Blogs</Text>
      </View>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              padding: 15,
              marginBottom: 10,
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
            onPress={() => navigation.navigate("Detail", { detail: item })}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 350, borderRadius: 5 }}
              resizeMode="contain"
            />
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginVertical: 5 }}
            >
              {item.title}
            </Text>
            {/* <Text>{item.message}</Text> */}
            <Text style={{ fontStyle: "italic", color: "#555" }}>
              {item.author}
            </Text>

            <Text style={{ fontSize: 12, color: "#888" }}>
              {new Date(item.date).toDateString()}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "lightgrey",
                padding: "10",
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={() => navigation.navigate("Edit", { blog: item })}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                UPDATE
              </Text>
            </TouchableOpacity>
            {deleting === item._id ? (
              <ActivityIndicator size="small" color="red" />
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  padding: "10",
                  borderRadius: 5,
                  marginTop: 10,
                }}
                onPress={() => handleDelete(item._id)}
                disabled={deleting !== null}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  DELETE
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
      {/* <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              padding: 20,
              backgroundColor: "#fff",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            {selectedBlog && (
              <>
                <Text
                  style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}
                >
                  {selectedBlog.title}
                </Text>
                {selectedBlog.image ? (
                  <Image
                    source={{ url: selectedBlog.image }}
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  />
                ) : null}
                <Text style={{ fontSize: 16, marginButton: 10 }}>
                  {selectedBlog.message}
                </Text>
                <Text style={{ fontSize: 14, marginButton: 5 }}>
                  Author: {selectedBlog.author}
                </Text>
                <Text style={{ fontSize: 14, marginButton: 15, color: "#555" }}>
                  Date: {new Date(selectedBlog.date).toDateString()}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2196F3",
                    padding: 10,
                    borderRadius: 5,
                    width: "100%",
                  }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
