import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';

const BlogCard = ({ userProfileImage, title, content, likeCount }) => {
  const [liked, setLiked] = useState(false);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const { colors } = useTheme();
  const handleLikePress = () => {
    setLiked(!liked);
    if (liked) {
      setLikeCountState(likeCountState - 1);
    } else {
      setLikeCountState(likeCountState + 1);
    }
  };

  return (
    <View style={styles.container(colors)}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.hr(colors)}></View>
          <Image source={{ uri: userProfileImage }} style={styles.userImage(colors)} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content} numberOfLines={10} ellipsizeMode="tail">{content}</Text>
        </View>
      </View>
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={handleLikePress}>
          {liked ? (
            <AntDesign name="heart" size="20" color={colors.primaryColor}/>
          ) : (
            <AntDesign name="hearto" size="20" color={colors.primaryColor}/>
          )}
        </TouchableOpacity>
        <Text style={styles.likeCount(colors)}>{likeCountState} Likes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:(colors) => ({
    padding: 5,
    borderBottomWidth: 1,
    backgroundColor: colors.cardBackground,
    flexDirection: 'column',
    borderBottomColor: colors.primaryColor,
  }),
  topContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    alignItems: 'center',
  },
  hr: (colors) => ({
    backgroundColor: colors.secondaryColor,
    border: 1,
    height: '100%',
    position: 'absolute',
    width: 2,
  }),
  userImage: (colors) => ({
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 15,
    borderWidth: 2,
    borderColor: colors.secondaryColor,
  }),
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 6
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black'
  },
  content: {
    fontSize: 14,
    marginTop: 5,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 16,
    gap: 10,
  },
  likeCount: (colors) => ({
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.secondaryColor,
  }),
});

export default BlogCard;
