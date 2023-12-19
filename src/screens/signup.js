const { SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableOpacity, Image} = require("react-native")
import { useState } from 'react'
import { showMessage } from "react-native-flash-message"
import Input from '../components/input'
import Button from '../components/button'
import { useTheme } from '@react-navigation/native'
const { width } = Dimensions.get('window')

const SignUp = ({navigation}) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { colors } = useTheme()

  const handlerSignUp = () => {
    if(name === '' || surname === '' || email === '' || password === '') {
      showMessage({
        message: "Please fill all the fields",
        type: "info",
        icon: 'info',
        backgroundColor: colors.necessary,
      });
      return
    }
  }
  return (
    <SafeAreaView style={styles.container(colors)}>
      <View style={styles.imgContainer(colors)}>
        <Image source={require('../../assets/images/rg-img.png')} style={{width: width * 0.6, height: width * 0.6}}/>
      </View>
      <Input placeholder="Name" iconName={'md-person'} onChangeText={setEmail}/>
      <Input placeholder="Email" iconName={'md-mail'} onChangeText={setEmail} type={"email-address"}/>
      <Input placeholder="Password" iconName={'ios-lock-closed'} secureTextEntry={true} onChangeText={setPassword} />
      <Input placeholder="Age" iconName={'md-body'} onChangeText={setPassword} type={"numeric"}/>
      <Button onPress={handlerSignUp}>
        <Text style={styles.buttonText({width})}>Sign up</Text>
      </Button>
      <View style={styles.signUpContainer}>
        <Text style={{fontSize: width * 0.035, color: colors.textColor}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={[styles.signUpText({width}), {color: colors.textColor}]}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: (color) => ({
    flex: 1,
    alignItems: "center",
    backgroundColor: color.background,
  }),
  imgContainer: (color) => ({
    backgroundColor: color.primaryColor,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 200,
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 8,
    borderColor: color.secondaryColor,
  }),
  buttonText: ({width}) => ({
    color: 'black',
    fontSize: width * 0.05,
    fontWeight: '300'
  }),
  signUpContainer: {
    width: '80%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  signUpText: ({width}) => ({
    fontSize: width * 0.035,
    color: 'black',
    fontWeight: 'bold'
  })
})
export default SignUp