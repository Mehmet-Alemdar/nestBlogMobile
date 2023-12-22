import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import { useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/authContext"
import {fetchUserById} from "../lib/apiConnection"
import HomeScreen from "../screens/home"
import CreateBlogScreen from "../screens/createBlog"
import ProfileScreen from "../screens/profile"

const Tab = createBottomTabNavigator();

const Main = () => {
  const { colors } = useTheme()
  const { getUserIdAndToken } = useContext(AuthContext)
  const [img, setImg] = useState("https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png")

  useEffect(() => {
    getUserIdAndToken().then(({ id, token }) => {
      fetchUserById(token, id).then((data) => {
        setImg(data.profilePicture)
      })
    })
  }, [])

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconComponent;

        if (route.name === 'Home') {
          iconComponent = (
            <Ionicons
              name={focused ? 'ios-home' : 'ios-home-outline'}
              size={size}
              color={color}
            />
          );
        } else if (route.name === 'Create Blog') {
          iconComponent = (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={size}
              color={color}
            />
          );
        } else if (route.name === 'Profile') {
          iconComponent = (
            <Image
              source={{ uri: img }}
              style={[{ width: 35, height: 35, borderRadius: 35 / 2 }, focused && { borderColor: colors.secondaryColor, borderWidth: 2 }]}
            />
          );
        }

        return iconComponent;
      },
      tabBarActiveTintColor: colors.secondaryColor,
      tabBarInactiveTintColor: 'gray',
      tabBarStyle:{
        backgroundColor: colors.background,
        borderTopColor: 'gray',
      },
      headerStyle: {
        backgroundColor: colors.background,
      },
      tabBarShowLabel: false
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Create Blog" component={CreateBlogScreen} /> 
      <Tab.Screen name="Profile" component={ProfileScreen} /> 
    </Tab.Navigator>
  );
}

export default Main