import axios from "axios";
import { BASE_URL } from '@env'

export const singInApi = async (body) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, body)
    console.log(data);
    return data
  } catch(error) {
    return {message: 'sign in failed', description: error.response.data.message[0], error}
  }
}

export const signUpApi = async (body) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user`, body)
    console.log(data);
    return data
  } catch(error) {
    return {message: 'sign up failed', error}
  }
}

export const fetchBlogPosts = async (token) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/blog/findAll`, {
      headers: { Authorization: token}
    })
    return data
  } catch(error) {
    return {message: 'sign in failed', description: error.response.data.message[0], error}
  }
}