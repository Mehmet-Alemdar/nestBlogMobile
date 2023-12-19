import axios from "axios";
import { BASE_URL } from '@env'

export const singInApi = async (body) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, body)
    return data
  } catch(error) {
    return {message: 'sign in failed', error}
  }
}