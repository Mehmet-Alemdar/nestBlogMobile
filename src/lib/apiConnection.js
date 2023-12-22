import axios from "axios";
import { BASE_URL } from '@env'
import {getToken} from '../auth/authentication'

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

export const fetchBlogById = async (token,id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/blog/findOne/${id}`, {
      headers: { Authorization: token}
    })
    return data
  } catch(error) {
    return {message: 'blog fetching failed', description: error.response.data.message[0], error}
  }
}

export const likeBlog = async (token, blogId, userId) => {
  try {
    const { data } = await axios.patch(`${BASE_URL}/blog/likeOne/${blogId}/${userId}`, {
      headers: { Authorization: token}
    })
    return data
  } catch(error) {
    return {message: 'blog fetching failed', description: error.response.data.message[0], error}
  }
}

export const fetchUserById = async (token,id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/user/findOne/${id}`, {
      headers: { Authorization: token}
    })
    return data
  } catch(error) {
    return {message: 'user fetching failed', description: error.response.data.message[0], error}
  }
}