import { Text, SafeAreaView, StyleSheet, Dimensions, Image, View } from "react-native"
import { useState, useContext } from "react"
import Input from "../components/input"
import Button from '../components/button'
import { useTheme } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import { singInApi } from "../lib/apiConnection";
import { AuthContext } from "../auth/authentication";

const { width } = Dimensions.get('window')
const SingIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { colors } = useTheme();

  const { signIn } = useContext(AuthContext)

  const handlerSignIn = () => {
    singInApi({email, password}).then((res) => {
      if(!res.error) {
        signIn({email, token: res.token})
        return
      } else {
        showMessage({
          message: res.message,
          type: 'danger',
          icon: 'danger',
          duration: 3000,
          floating: true,
          backgroundColor: colors.danger,
        })
      }
    }) 
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