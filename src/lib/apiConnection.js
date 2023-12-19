import axios from "axios";
import { BASE_URL } from '@env'

export const singInApi = async (body) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, body)
    return data
  } catch(error) {
    return {message: 'sign in failed', description: error.response.data.message[0], error}
  }
}

export const signUpApi = async (body) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user`, body)
    return data
  } catch(error) {
    return {message: 'sign up failed', error}
  }
}