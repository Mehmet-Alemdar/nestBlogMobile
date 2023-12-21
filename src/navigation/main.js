import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from "@react-navigation/native";

import HomeScreen from "../screens/home"
import CreateBlogScreen from "../screens/createBlog"
import ProfileScreen from "../screens/profile"

const Tab = createBottomTabNavigator();

const Main = () => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home-outline';
        } else if (route.name === 'Create Blog') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'ios-person' : 'ios-person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.textColor,
      tabBarInactiveTintColor: 'gray',
      tabBarStyle:{
        backgroundColor: colors.background,
        borderTopColor: 'gray'
      },
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTitleStyle: {
        color: colors.textColor
      }
    })}>
      <Tab.Screen name="Home" component={HomeScreen}  options={{headerShown: false}}/>
      <Tab.Screen name="Create Blog" component={CreateBlogScreen} /> 
      <Tab.Screen name="Profile" component={ProfileScreen} /> 
    </Tab.Navigator>
  );
}

export default Main