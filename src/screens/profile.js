import { SafeAreaView, Text, ScrollView, View, Image, StyleSheet } from "react-native";
import React, { useContext, useState, useCallback } from 'react'
import { AuthContext } from '../contexts/authContext'
import { fetchUserById } from '../lib/apiConnection'
import { useFocusEffect } from '@react-navigation/native';
import UserProfileBlogCard from "../components/userProfileBLogCard";
import Button from "../components/button";

const Profile = ({navigation}) => {
  const { signOut, getUserIdAndToken } = useContext(AuthContext)
  const [data, setData] = useState({})
  const [likes, setLikes] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
    getUserIdAndToken().then(({ id, token }) => {
      fetchUserById(token, id).then((data) => {
        setData(data)
        const likeCount = (data.blogPosts.map(i => i.likes.length)).reduce((a, b) => a + b)
        setLikes(likeCount)
        setIsLoading(false)
      })
    })
    }, [])
  )

  return (
    <SafeAreaView style={{ margin: 10}}>
      {isLoading
        ?
        <Text>Loading...</Text>
        :
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userInfoContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: data.profilePicture }} style={styles.userImg} />
              <Text>{data.name}</Text>
            </View>
            <View style={styles.userInfoSection}>
              <Text style={{fontWeight: 'bold'}}>Posted</Text>
              <Text>{data.blogPosts.length}</Text>
            </View>
            <View style={styles.userInfoSection}>
              <Text style={{fontWeight: 'bold'}}>Likes</Text>
              <Text>{likes}</Text>
            </View>
            <View style={styles.userInfoSection}>
              <Text style={{fontWeight: 'bold'}}>You Liked</Text>
              <Text>{data.likedPosts.length}</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
           <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>Your blogs,</Text>
              <Text style={styles.postCount}>{data.blogPosts.length}</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {data.blogPosts.map((blog, index) => (
                <UserProfileBlogCard key={index} blog={blog} navigation={navigation} blogId={blog._id} topic={blog.topic}/>
              ))}
            </ScrollView>
          </View>
          <View style={styles.contentContainer}>
           <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>Blogs you like,</Text>
              <Text style={styles.postCount}>{data.likedPosts.length}</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {data.likedPosts.map((blog, index) => (
                <UserProfileBlogCard key={index} blog={blog} navigation={navigation} blogId={blog._id} topic={blog.topic}/>
              ))}
            </ScrollView>
          </View>

          <View style={{marginLeft: 10,  alignItems: 'center'}}>
            <Button onPress={signOut} >
              <Text>Sign out</Text>
            </Button>
          </View>
        </ScrollView>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  imageContainer: {
    alignItems: 'center',
    gap: 5
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  userInfoSection: {
    flex: 1,
    alignItems: 'center',
    gap: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10
  },
  postCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    marginLeft: 5,
    marginVertical: 10,
  },
  contentContainer: {
    marginVertical: 10,
    marginLeft: 5
  }
})

export default Profile;