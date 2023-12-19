import { Text, SafeAreaView, StyleSheet, Dimensions, Image, View } from "react-native"
import { useState } from "react"
import Input from "../components/input"
import Button from '../components/button'
import { useTheme } from '@react-navigation/native';


const { width } = Dimensions.get('window')
const SingIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { colors } = useTheme();

  const handlerSignIn = () => {
  }

  return (
    <SafeAreaView style={styles.container(colors)}>
      <View style={styles.imgContainer(colors)}>
        <Image source={require('../../assets/images/lg-img.png')} style={{width: width * 0.6, height: width * 0.6}}/>
      </View>
      <Input placeholder="Email" iconName={'md-mail'} onChangeText={setEmail}/>
      <Input placeholder="Password" iconName={'ios-lock-closed'} secureTextEntry={true} onChangeText={setPassword}/>
      <Button onPress={handlerSignIn}>
        <Text style={styles.buttonText({width})}>Sign in</Text>
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: (color) => ({
    flex: 1,
    alignItems: "center",
    backgroundColor: color.background,
  }),
  imgContainer:  (color) => ({
    backgroundColor: color.primaryColor,
    borderRadius: 200,
    marginTop: 60,
    marginBottom: 30,
    borderWidth: 5,
    borderColor: color.ligtPrimaryColor,
  }),
  buttonText: ({width}) => ({
    color: 'black',
    fontSize: width * 0.05,
    fontWeight: '300'
  }),
})

export default SingIn