import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/signin'
import SignUpScreen from '../screens/signup'

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default AuthNavigator