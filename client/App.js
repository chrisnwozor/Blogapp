import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import HomeScreen from "./screens/HomeScreen";
import AddBlogScreen from "./screens/AddBlogScreen";
import EditBlogScreen from "./screens/EditBlogScreen";
import DetailBlogScreen from "./screens/DetailBlogScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "Blog") {
          iconName = "add-circle";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "blue",
      tabBarInactiveTintColor: "grey",
      headerShown: false,
      initialRouteName: "Home",
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Blog" component={AddBlogScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Edit" component={EditBlogScreen} />
        <Stack.Screen name="Detail" component={DetailBlogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
