import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchBlogById, likeBlog } from '../lib/apiConnection';
import { AuthContext } from '../contexts/authContext'
import moment from 'moment';


const BlogDetail = ({ route }) => {
  const { colors } = useTheme();
  const { getToken, getUserId, getUserIdAndToken } = React.useContext(AuthContext)
  const [data, setData] = useState({})
  const [liked, setLiked] = useState(false)
  const [likedCount, setLikedCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getToken().then((token) => {
      fetchBlogById(token, route.params.blogId).then((res) => {
        getUserId().then((id) => {
          if(res.likes.includes(id)) {
            setLiked(true)
          }
        })
        setData(res)
        setLikedCount(res.likes.length)
        setIsLoading(false)
      })
    })
  }, [])

  handleLikePress = () => {
    setLiked(!liked)
    getUserIdAndToken().then(({id, token}) => {
      likeBlog(token, route.params.blogId, id)
    })
    if (liked) {
      setLikedCount(likedCount - 1)
    } else {
      setLikedCount(likedCount + 1)
    }
  }

  return (
    <>
      {isLoading
        ?
        <Text>Loading...</Text>
        :
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topContainer}>
            <Image
              source={{
                uri: data.image,
              }}
              style={{ width: '100%', height: 250 }}
            />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
              style={styles.overlay}
            />
          </View>
          <View style={{ backgroundColor: 'black' }}>
            <Text style={styles.title}>
              {data.title}
            </Text>
            <View style={styles.userContainer}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 }}>
                <Image source={{ uri: data.user.profilePicture}} style={styles.userImg(colors)}/>
                <Text style={styles.userNameText}>{data.user.name}</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5, flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity onPress={handleLikePress}>
                  <Ionicons name={liked ? "heart" : 'heart-outline'} size={25} color={colors.secondaryColor} />
                </TouchableOpacity>
                <Text style={{ color: "white", fontSize: 12 }}>{likedCount}</Text>
              </View>
              <Text style={styles.dateText}>{moment(data.createdAt).format('DD MMM, YYYY')}</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              {data.content}
            </Text>
          </View>
        </ScrollView>
      }
    </>


  );
};

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 15,
    color: 'white'
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10
  },
  userImg: (colors) => ({
    width: 55,
    height: 55,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.primaryColor,
  }),
  userNameText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white'
  },
  dateText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
    textAlign: 'right'
  },
  contentContainer: {
    margin: 10,
  },
  contentText: {

    fontSize: 16,
    lineHeight: 25,
  }
});

export default BlogDetail;
